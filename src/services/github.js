import Axios from 'axios'

async function getQuestions() {
  const repoUrl =
    'https://api.github.com/repos/royledford/front-end-interview-handbook/readme'

  try {
    const file = await Axios.get(repoUrl)
    const markdown = atob(file.data.content)
    return markdown
  } catch (error) {
    return error
  }
}

async function questionsToJson() {}

export { getQuestions }
