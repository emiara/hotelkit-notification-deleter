const deleteAllButton = document.getElementById("deleteAll");
const deleteNonMentionedButton = document.getElementById("deleteNonMentioned")
if (!deleteAllButton) {
  throw new Error("Delete all button doesn't exist: " + deleteAllButton);
}
if (!deleteNonMentionedButton) {
  throw new Error("Delete non-mentioned button doesn't exist: " + deleteNonMentionedButton)
}

deleteAllButton.addEventListener('click', async () => {
  showResult('Processing all deletions...');
  chrome.runtime.sendMessage(
    { action: 'deleteAll' },
    response => {
      showResult(`Deleted ${response.total} notifications!`);
    }
  );
});

deleteNonMentionedButton.addEventListener('click', async () => {
  showResult('Processing non-mentioned notifications...');
  chrome.runtime.sendMessage(
    { action: 'deleteNonMentioned' },
    response => {
      showResult(`Deleted ${response.total} notifications!`);
    }
  );
});

function showResult(message: string) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) {
    throw new Error("Result div doesn't exist: " + resultDiv);
  }
  resultDiv.innerText = message;
  resultDiv.hidden = false;
}
