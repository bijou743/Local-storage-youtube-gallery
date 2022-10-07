const videosContainer = document.getElementById('videosContainer');
const videoIdInput = document.getElementById('videoId');
const popup = document.getElementById('popup');
const videoEl = document.querySelector('#popup > iframe');
const IDS_KEY = 'youtubeVideoIds';

let youtubeVideoIds = [];

const loadVideos = () => {
	youtubeVideoIds = JSON.parse(localStorage.getItem(IDS_KEY)) || [];
};

const displayVideos = () => {
	const videosHtmlStrings = youtubeVideoIds
		.map(
			(id) => `
		<li onclick="clickVideo(event, '${id}')">
			<img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for Youtube video with id ${id}">
			<button class="delete-btn" title="Delete from gallery">&times;</button>
		</li>
		`
		)
		.join('');
	videosContainer.innerHTML = videosHtmlStrings;
};

const clickVideo = (event, id) => {
	if (event.target.classList.contains('delete-btn')) {
		youtubeVideoIds = youtubeVideoIds.filter((i) => i !== id);
		updateLocalStorage();
		displayVideos();
	} else {
		videoEl.src = `https://www.youtube.com/embed/${id}`;
		popup.classList.add('open');
		popup.classList.remove('closed');
	}
};

const saveVideo = (event) => {
	event.preventDefault();
	const videoId = videoIdInput.value;
	youtubeVideoIds.unshift(videoId);
	videoIdInput.value = '';
	updateLocalStorage();
	displayVideos();
};

const handlePopupClick = (event) => {
	popup.classList.add('closed');
	popup.classList.remove('open');
};

const updateLocalStorage = () => {
	localStorage.setItem(IDS_KEY, JSON.stringify(youtubeVideoIds));
};

loadVideos();
displayVideos();
