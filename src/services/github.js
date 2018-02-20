import Axios from 'axios'

/**
 * Get the README.md from github and convert into
 * an array of question/answer objects
 */
async function getQuestions() {
  const rawText = await fetchGithubQuestions()

  if (typeof rawText === 'object') {
    // If we couldn't get the readme make an object to show
    // in the UI.
    return [
      {
        question: "Sorry, we couldn't find the handbook on Github.com",
        answer: "Sorry, we couldn't find the handbook on Github.com",
        shown: false,
      },
    ]
  } else {
    const rawQuestions = stripNonQuestions(rawText.split('\n'))
    let questions = rawQuestionsToArray(rawQuestions)

    // remove the first \n from the answers
    questions = questions.map(obj => {
      obj.answer = obj.answer.slice(1)
      return obj
    })

    return questions
  }
}

/**
 * Get the github README.md
 */
async function fetchGithubQuestions() {
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

/* Is this a questions? */
const isQuestion = line => line.slice(0, 4) === '### '

/**
 * Remove all the non question text from the readme.md
 */
function stripNonQuestions(questionsRaw) {
  const justQuestions = questionsRaw.reduce((found, line) => {
    if (found.length > 0) {
      found.push(line)
      return found
    }

    if (isQuestion(line)) {
      found.push(line)
      return found
    }
    return []
  }, [])

  return justQuestions
}

/**
 * Turn the array of raw question/answer text into an array of objects
 */
function rawQuestionsToArray(rawQuestions) {
  const questionArray = rawQuestions.reduce((questions, line, i) => {
    if (isQuestion(line)) {
      const topic = {
        question: line,
        answer: '',
        shown: false,
      }
      questions.push(topic)
      return questions
    }

    questions[questions.length - 1].answer += line + '\n'
    return questions
  }, [])

  return questionArray
}

export { getQuestions }
