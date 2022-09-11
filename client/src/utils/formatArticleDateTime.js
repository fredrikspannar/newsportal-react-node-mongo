
const formatArticleDateTime = (publishedAt) => {
    
    const publishedDate = new Date(publishedAt);
    const formattedPublishedAtDate = publishedDate.toLocaleDateString('sv-SE');

    const hours = publishedDate.getHours();
    const minutes = publishedDate.getMinutes();

    const formattedPublishedAtTime = (hours < 10 ? '0'+hours : hours) + ':' + (minutes < 10 ? '0'+minutes : minutes);

    return { 'date': formattedPublishedAtDate, 'time': formattedPublishedAtTime }
}

export default formatArticleDateTime;