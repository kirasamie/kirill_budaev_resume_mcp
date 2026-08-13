import { isErrorOfType } from '@portfolio/common';
import { ResumeErrorCode, useQueryResume } from '@entities/resume';
import { CareerSections } from '@widgets/career-sections';
import { InfoSidebar } from '@widgets/info-sidebar';
import { ErrorNotice, SuspenseLoading } from '@shared/ui';

const loadingMessage = 'Загрузка резюме…';
const errorFallback = 'Не удалось загрузить резюме';
const retryLabel = 'Повторить';

const ResumePage = () => {
  const { data, isPending, isError, isFetching, error, refetch } =
    useQueryResume();

  const handleRetry = async () => {
    await refetch();
  };

  if (isPending) {
    return <SuspenseLoading message={loadingMessage} />;
  }

  if (isError) {
    const message = isErrorOfType(error, ResumeErrorCode.ResumeFetch)
      ? error.message
      : errorFallback;

    return (
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <ErrorNotice
          message={message}
          retryLabel={retryLabel}
          isRetrying={isFetching}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    profile,
    contact,
    skills,
    experience,
    projects,
    education,
    certifications,
  } = data;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col overflow-hidden rounded-xl border border-border-base-main lg:flex-row">
        <InfoSidebar profile={profile} contact={contact} skills={skills} />
        <CareerSections
          profile={profile}
          experience={experience}
          projects={projects}
          education={education}
          certifications={certifications}
        />
      </div>
    </div>
  );
};

export default ResumePage;
