import { handleSubmit } from './js/app'


// Importing SASS files.
import './styles/style.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'

// It is required in this project to use .addEventListener() and here is the appropriate place.
document.getElementById('submit').addEventListener('click', handleSubmit);

export {
	handleSubmit
}
