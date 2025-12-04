// Scroll doux pour tous les liens internes
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    if(link.hash !== "") {
      e.preventDefault();
      const target = document.querySelector(link.hash);
      if(target) target.scrollIntoView({ behavior: "smooth" });
	  const likeRef = database.ref('likes/count');
likeRef.on('value', snapshot => {
  likeCount.innerText = snapshot.val() || 0;
});
likeBtn.onclick = () => {
  likeRef.transaction(current => (current || 0) + 1);
};

// Commentaires
const commentInput = document.getElementById('commentInput');
const sendComment = document.getElementById('sendComment');
const commentList = document.getElementById('commentList');

const commentsRef = database.ref('comments');
commentsRef.on('child_added', snapshot => {
  const div = document.createElement('div');
  div.innerText = snapshot.val();
  commentList.appendChild(div);
});

sendComment.onclick = () => {
  const text = commentInput.value.trim();
  if(text) {
    commentsRef.push(text);
    commentInput.value = '';
    }
  });
});