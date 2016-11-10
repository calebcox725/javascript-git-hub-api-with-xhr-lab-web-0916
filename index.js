document.getElementById("search_form").addEventListener("submit", function(event){
  event.preventDefault()
})

function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => `<li>${r.name}<br>${r.owner.login}<br>${r.html_url}<br><a href="#" onclick="getCommits('${r.owner.login}', '${r.name}')">Get Commits</a><br><a href="#" onclick="getBranches('${r.owner.login}', '${r.name}')">Get Branches</a></li>`).join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(username, repository) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => `<li>${c.commit.author.name}<br>${c.author.login}<br>${c.commit.message}</li>`).join('')}</ul>`
  document.getElementById("details").innerHTML = commitList
}

function getBranches(username, repository) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => `<li>${b.name}</li>`).join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}