const calculatePostReadingTime = (postContent: string) => {
  const text = postContent;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
};

const getFormattedPostDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-EN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

export { calculatePostReadingTime, getFormattedPostDate };
