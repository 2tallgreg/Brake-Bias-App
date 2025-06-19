const CarReviewDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl animate-fade-in text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4">{data.yearMakeModel}</h2>
      <p className="italic text-gray-600 dark:text-gray-300 mb-6">{data.tldr}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex flex-col justify-center items-center gap-2 text-center">
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">MSRP</span>
            <p className="font-bold text-2xl text-gray-800 dark:text-gray-100">{data.msrp}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Used Market Avg.</span>
            <p className="font-bold text-2xl text-gray-800 dark:text-gray-100">{data.usedAvg}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg flex flex-col justify-center text-center">
            <p className="text-lg font-semibold">{data.engine}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-bold">Drivetrain:</span> {data.drivetrain} | <span className="font-bold">Transmission:</span> {data.transmission}
            </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">Professional Reviews</h3>
        {data.reviews && data.reviews.length > 0 ? (
          data.reviews.map((review, index) => (
            <div key={index} className="mb-4 bg-gray-200 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-bold">{review.source} ({review.review_year}) - <span className="text-green-500">{review.sentiment}</span></p>
              <p className="text-gray-700 dark:text-gray-300">"{review.text}"</p>
              <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Read Full Review &rarr;</a>
              {review.disclaimer && ( <div className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 text-sm"><p><strong className="font-bold">Note:</strong> {review.disclaimer}</p></div> )}
            </div>
          ))
        ) : <p className="text-gray-600 dark:text-gray-400">No professional reviews found.</p>}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">Owner Sentiment from Reddit</h3>
        {data.ownerSentiment ? (
          <div className="bg-gray-200 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="font-bold capitalize">{data.ownerSentiment.sentiment}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{data.ownerSentiment.text}</p>
              {data.ownerSentiment.keywords && (data.ownerSentiment.keywords.positive?.length > 0 || data.ownerSentiment.keywords.negative?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">Common Praise:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.ownerSentiment.keywords.positive?.map((keyword, i) => (<span key={i} className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-xs font-medium rounded-full">{keyword}</span>))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-2 text-red-700 dark:text-red-400">Common Complaints:</p>
                     <div className="flex flex-wrap gap-2">
                      {data.ownerSentiment.keywords.negative?.map((keyword, i) => (<span key={i} className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 text-xs font-medium rounded-full">{keyword}</span>))}
                    </div>
                  </div>
                </div>
              )}
              <p className="font-semibold text-sm mb-2">Relevant Discussions:</p>
              {data.ownerSentiment.discussion_links && data.ownerSentiment.discussion_links.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {data.ownerSentiment.discussion_links.map((thread, index) => ( <li key={index}><a href={thread.link} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">{thread.title}</a></li> ))}
                </ul>
              ) : <p className="text-gray-600 dark:text-gray-400 text-sm">No specific discussion threads found.</p>}
          </div>
        ) : <p className="text-gray-600 dark:text-gray-400">No owner sentiment data found.</p>}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">Photo Gallery</h3>
        {data.photos && data.photos.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {data.photos.map((color, index) => {
                const searchQuery = `${data.yearMakeModel} ${color}`;
                const googleImagesUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`;
                return (
                  <a key={index} href={googleImagesUrl} target="_blank" rel="noopener noreferrer" className="group block text-center">
                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-600 rounded-lg border-2 border-gray-300 dark:border-gray-700 group-hover:border-red-500 group-hover:cursor-pointer transition-colors"></div>
                    <p className="text-center text-sm mt-1 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">{color}</p>
                  </a>
                )
              })}
          </div>
        ) : <p className="text-gray-600 dark:text-gray-400">No photo color data found.</p>}
      </div>
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">Summary</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summary || "No summary available."}</p>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold border-b-2 border-red-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">Search For Listings</h3>
        {data.autoTempestLink ? (
          <a href={data.autoTempestLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
            Search all major listings on AutoTempest &rarr;
          </a>
        ) : ( <p className="text-gray-600 dark:text-gray-400">Could not generate a listings link for this model.</p> )}
      </div>

    </div>
  );
};

export default CarReviewDisplay;