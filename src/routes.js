import Home from './components/Home/Home.vue'
import Person from './components/Person/PersonHome.vue'
import Quote from '../src/components/Quotes/QuoteHome.vue'
import Todo from './components/Todo/Todo.vue'
export const routes= [
    {
        path: '', component: Home
    },
    {
        path: '/quote', component: Quote
    },
    {
        path: '/person', component: Person
    },
    {
        path: '/todo', component: Todo
    }
]