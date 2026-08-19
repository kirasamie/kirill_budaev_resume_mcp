# TODO: интеграция SonarQube

Цель: добавить анализ качества и безопасности TypeScript-кода в существующий
GitHub Actions pipeline, публиковать coverage и блокировать интеграцию изменений,
которые не проходят Quality Gate.

## 1. Принять архитектурные решения

- [ ] Использовать **SonarQube Server**, а не SonarCloud.
- [ ] Выбрать поддерживаемую версию SonarQube Server: актуальный LTA-релиз либо
      текущий стабильный релиз.
- [ ] Проверить возможности выбранной edition:
  - анализ Pull Request и веток;
  - GitHub PR decoration;
  - доступность нужных security rules;
  - native monorepo support.
- [ ] На первом этапе анализировать репозиторий как **один SonarQube project**:
      `apps/*` и `packages/*`.
- [ ] Не создавать отдельный SonarQube project для каждого workspace без
      практической необходимости. Native monorepo-конфигурация нескольких
      проектов требует проверки лицензии/Enterprise edition.
- [ ] Определить место размещения:
  - отдельный VPS;
  - существующий инфраструктурный VPS;
  - локальный стенд только для знакомства.
- [ ] Не размещать SonarQube внутри production-контейнера приложения.

## 2. Подготовить инфраструктуру SonarQube

- [ ] Подготовить отдельный Compose-проект для SonarQube и PostgreSQL.
- [ ] Не использовать встроенную H2 database в production.
- [ ] Создать отдельные PostgreSQL database и user для SonarQube.
- [ ] Хранить database password только в `.env`/secret storage, не в Git.
- [ ] Добавить persistent volumes для:
  - SonarQube data;
  - SonarQube extensions/plugins;
  - SonarQube logs;
  - PostgreSQL data.
- [ ] Проверить системные требования выбранной версии:
  - RAM и CPU;
  - свободное место;
  - Linux limits;
  - параметры Elasticsearch, включая `vm.max_map_count`, если они требуются
    выбранной версией.
- [ ] Добавить healthcheck для SonarQube и PostgreSQL.
- [ ] Настроить restart policy и log rotation.
- [ ] Разместить SonarQube за reverse proxy.
- [ ] Настроить HTTPS и постоянный URL, например `https://sonar.example.com`.
- [ ] Не публиковать PostgreSQL port в интернет.
- [ ] Ограничить административный интерфейс firewall/VPN, если публичный доступ
      не нужен.
- [ ] Настроить регулярный backup PostgreSQL и persistent data.
- [ ] Документировать процедуру обновления и rollback SonarQube.

## 3. Обеспечить сетевой доступ из GitHub Actions

- [ ] Убедиться, что GitHub-hosted runner может открыть `SONAR_HOST_URL`.
- [ ] Если SonarQube доступен только в private network, выбрать один вариант:
  - self-hosted GitHub Actions runner в той же сети;
  - VPN/tunnel между runner и инфраструктурой;
  - безопасно опубликованный HTTPS endpoint.
- [ ] Не использовать `localhost` в `SONAR_HOST_URL`: для GitHub-hosted runner
      это будет адрес самого runner, а не VPS.
- [ ] Если TLS использует private CA, подготовить certificate chain и
      `SONAR_ROOT_CERT` согласно документации SonarQube Scan Action.
- [ ] Проверить доступность endpoint из CI до подключения Quality Gate.

## 4. Настроить SonarQube Server

- [ ] Сменить стандартный administrator password.
- [ ] Создать SonarQube project для всего репозитория.
- [ ] Выбрать постоянный project key, например:
      `kirill-budaev_mcp-resume`.
- [ ] Указать display name проекта.
- [ ] Назначить `main` основной веткой.
- [ ] Привязать SonarQube project к GitHub repository.
- [ ] Если edition поддерживает PR decoration, настроить GitHub App:
  - App ID;
  - Client ID;
  - Client secret;
  - Private key;
  - installation на нужный repository.
- [ ] Создать **project analysis token**, а не использовать administrator token.
- [ ] Ограничить права токена только анализом нужного проекта.
- [ ] Сохранить token сразу после создания: повторно SonarQube его не покажет.
- [ ] Проверить timezone, retention и housekeeping settings.

## 5. Добавить GitHub secrets и variables

- [ ] Добавить Repository Secret:

  ```text
  SONAR_TOKEN=<project analysis token>
  ```

- [ ] Добавить Repository Variable:

  ```text
  SONAR_HOST_URL=https://sonar.example.com
  ```

- [ ] Если URL не должен быть публичен, хранить `SONAR_HOST_URL` как Secret.
- [ ] При private CA добавить `SONAR_ROOT_CERT` как Secret.
- [ ] Не добавлять token в:
  - `sonar-project.properties`;
  - workflow arguments;
  - `.env.example`;
  - repository variables;
  - логи CI.
- [ ] Убедиться, что workflow из fork PR не получает `SONAR_TOKEN`.
- [ ] Решить, нужно ли использовать GitHub Environment для SonarQube secrets.

## 6. Подготовить coverage

Сейчас `test:cov` существует только у `apps/api`. Для SonarQube нужны LCOV
reports для тестируемых workspace-пакетов.

- [ ] Добавить root script `test:coverage`.
- [ ] Добавить coverage scripts для:
  - `packages/common`;
  - `packages/portfolio-data`;
  - `packages/portfolio-domain`;
  - `apps/api`.
- [ ] Для каждого Jest-проекта включить:

  ```text
  --coverage --coverageReporters=lcov --coverageReporters=text
  ```

- [ ] Назначить каждому workspace уникальный каталог:

  ```text
  packages/common/coverage/lcov.info
  packages/portfolio-data/coverage/lcov.info
  packages/portfolio-domain/coverage/lcov.info
  apps/api/coverage/lcov.info
  ```

- [ ] Убедиться, что пути `SF:` внутри LCOV однозначно указывают на файлы
      monorepo. Одинаковые `src/model.ts` из разных workspace не должны
      конфликтовать.
- [ ] Проверить, что generated coverage directories уже исключены из Git.
- [ ] Решить судьбу `apps/web`:
  - добавить Vitest и web coverage;
  - временно исключить web из coverage до появления тестов.
- [ ] Не исключать web из `sonar.sources`: отсутствие coverage должно быть
      осознанным решением, а не скрытием кода.
- [ ] Запустить coverage локально и проверить наличие всех `lcov.info`.
- [ ] Зафиксировать исходный coverage baseline без искусственного завышения.

## 7. Добавить `sonar-project.properties`

- [ ] Создать в корне `sonar-project.properties`.
- [ ] Добавить базовые параметры:

  ```properties
  sonar.projectKey=<project-key>
  sonar.projectName=MCP Resume
  sonar.sourceEncoding=UTF-8
  sonar.sources=apps,packages
  sonar.tests=apps,packages
  sonar.test.inclusions=**/*.spec.ts,**/test/**/*.ts
  ```

- [ ] Настроить исключения generated/vendor-кода:

  ```properties
  sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/coverage/**,apps/api/static/**
  ```

- [ ] Настроить coverage reports:

  ```properties
  sonar.javascript.lcov.reportPaths=packages/common/coverage/lcov.info,packages/portfolio-data/coverage/lcov.info,packages/portfolio-domain/coverage/lcov.info,apps/api/coverage/lcov.info
  ```

- [ ] Использовать `sonar.javascript.lcov.reportPaths` и для JavaScript, и для
      TypeScript. `sonar.typescript.lcov.reportPaths` устарел.
- [ ] Добавлять `sonar.coverage.exclusions` только для действительно
      нетестируемых файлов:
  - declarations;
  - bootstrap/configuration;
  - generated code;
  - test fixtures.
- [ ] Не исключать бизнес-логику ради прохождения Quality Gate.
- [ ] Проверить, нужны ли `sonar.typescript.tsconfigPaths` для monorepo.
- [ ] Не указывать `sonar.token` и `sonar.host.url` в properties-файле.

## 8. Интегрировать анализ в GitHub Actions

- [ ] Использовать официальный Action:

  ```text
  SonarSource/sonarqube-scan-action
  ```

- [ ] Закрепить Action на полном 40-character commit SHA.
- [ ] Оставить рядом комментарий с release-версией.
- [ ] Позволить Dependabot обновлять SHA через существующий
      `package-ecosystem: github-actions`.
- [ ] Для checkout Sonar job использовать:

  ```yaml
  with:
    fetch-depth: 0
  ```

  Полная Git-история нужна для корректного blame, новых issues и анализа веток.

- [ ] Выполнять шаги в порядке:
  1. checkout;
  2. setup pnpm/Node.js;
  3. `pnpm install --frozen-lockfile`;
  4. build reusable packages;
  5. `pnpm test:coverage`;
  6. SonarQube scan;
  7. Quality Gate check.
- [ ] Решить, где выполнять анализ:
  - отдельная job `sonarqube` с `needs: ci`;
  - внутри `ci` после coverage.
- [ ] Рекомендуемый первый вариант: отдельная job для явной ответственности и
      читаемого required check.
- [ ] Не запускать SonarQube analysis после Docker publish: анализ должен
      завершаться до публикации release image.
- [ ] Передать Action:

  ```yaml
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ vars.SONAR_HOST_URL }}
  ```

- [ ] Не передавать secrets в Docker build args.
- [ ] Учесть, что secrets недоступны workflow из fork Pull Request.
- [ ] Сначала запустить scanner без обязательного Quality Gate, исправить
      конфигурацию и только потом сделать check блокирующим.

## 9. Настроить Quality Profile и Quality Gate

- [ ] Начать со стандартного Sonar Way profile для TypeScript/JavaScript.
- [ ] Не отключать правила сразу после первых findings.
- [ ] Разобрать findings по категориям:
  - bug;
  - vulnerability;
  - security hotspot;
  - code smell;
  - duplication;
  - coverage.
- [ ] Настроить Quality Gate преимущественно на **New Code**, чтобы legacy
      baseline не блокировал внедрение.
- [ ] Определить New Code Definition:
  - предыдущая версия;
  - reference branch;
  - число дней.
- [ ] Зафиксировать начальные критерии, например:
  - 0 новых blocker/critical issues;
  - 0 новых vulnerabilities;
  - все новые security hotspots reviewed;
  - допустимый процент duplicated lines on new code;
  - реалистичный coverage threshold on new code.
- [ ] Не ставить высокий coverage threshold до получения первого достоверного
      LCOV report.
- [ ] После стабилизации включить Quality Gate status как required check для
      `main`/`develop`.
- [ ] Проверить, что failed/cancelled Sonar analysis действительно блокирует
      merge, а не остаётся информационным.

## 10. Провести пробную интеграцию

- [ ] Запустить анализ вручную в feature branch.
- [ ] Проверить в SonarQube:
  - найденные source files;
  - исключённые generated files;
  - test files;
  - coverage;
  - duplications;
  - SCM blame;
  - branch/PR association.
- [ ] Убедиться, что coverage не равен 0 из-за неверных LCOV paths.
- [ ] Проверить логи scanner на warnings:
  - unresolved imports;
  - missing tsconfig;
  - missing blame;
  - file indexed twice;
  - LCOV path not found.
- [ ] Создать тестовое нарушение Quality Gate и убедиться, что merge блокируется.
- [ ] Исправить нарушение и убедиться, что check становится green.
- [ ] Проверить поведение при недоступном SonarQube Server.
- [ ] Определить timeout и retry policy, не скрывающие реальный отказ анализа.

## 11. Эксплуатация

- [ ] Назначить ответственного за SonarQube administration.
- [ ] Настроить уведомления о падении сервиса и заполнении диска.
- [ ] Контролировать срок действия analysis token.
- [ ] Настроить ротацию token и документировать процедуру.
- [ ] Периодически обновлять SonarQube и PostgreSQL только по поддерживаемой
      upgrade path.
- [ ] Перед обновлением выполнять backup и проверять восстановление.
- [ ] Пересматривать Quality Gate после роста coverage и устранения baseline
      issues.
- [ ] Не превращать SonarQube issues в формальность: фиксировать false positive
      только с техническим обоснованием.

## Definition of Done

Интеграция считается завершённой, когда:

- [ ] SonarQube Server стабильно доступен по HTTPS из GitHub Actions.
- [ ] Project связан с GitHub repository.
- [ ] Analysis token хранится только в GitHub Secrets.
- [ ] Все тестируемые workspace публикуют корректный LCOV.
- [ ] Scanner видит source, tests и coverage без path warnings.
- [ ] Анализ выполняется на Pull Request и целевых ветках согласно возможностям
      выбранной edition.
- [ ] Quality Gate отображается в GitHub и блокирует некачественные изменения.
- [ ] `publish` не запускается при failed CI/Sonar Quality Gate.
- [ ] Backup, update и token rotation документированы.

## Официальная документация

- [GitHub Actions integration](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/ci-integration/github-actions)
- [JavaScript/TypeScript coverage](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/test-coverage/javascript-typescript-test-coverage/)
