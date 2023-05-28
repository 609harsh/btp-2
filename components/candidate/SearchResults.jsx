import React, { useCallback, useRef } from "react";
import AssessmentCard from "./AssessmentCard";
export default function SearchResults({ results, loading, hasMore, setPage }) {
  // INTERSECTION OBSERVER [INFINITE SCROLL]
  const observer = useRef();
  const lastAssessmentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // END OF INTERSECTION OBSERVER [INFINITE SCROLL]

  const getStatus = (currentUserData) => {
    if (!currentUserData) return "apply";
    if (!currentUserData.shortlisted && !currentUserData.attempted)
      return "applied";
    if (currentUserData.shortlisted && !currentUserData.attempted)
      return "upcoming";
    if (currentUserData.shortlisted && currentUserData.attempted)
      return "attempted";
    return "apply";
  };

	return (
		<div
			// justify-center
			className="grid justify-items-center gap-8 
      grid-cols-[repeat(auto-fit,minmax(32rem,.25fr))]
      2xl:grid-cols-[repeat(auto-fit,minmax(25rem,.25fr))]
      lg:grid-cols-[repeat(auto-fit,minmax(22rem,.25fr))]
      md:grid-cols-[repeat(auto-fit,minmax(18rem,.25fr))]
      "
		>
			{results?.map((assesInfo, index) => {
				if (index + 1 === results.length)
					return (
						<AssessmentCard
							frwdRef={lastAssessmentRef}
							key={index}
							data={assesInfo}
							status={getStatus(
								assesInfo?.data?.length ? assesInfo?.data[0] : null
							)}
						/>
					)
				else
					return (
						<AssessmentCard
							key={index}
							data={assesInfo}
							status={getStatus(
								assesInfo?.data?.length ? assesInfo?.data[0] : null
							)}
						/>
					)
			})}
		</div>
	)
}
