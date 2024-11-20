const Express = require('express') // Requiring the Express package for using the pre-built functionalities of Express
const ejs = require('ejs') // Requiring the EJS package for using EJS as the template engine

const app = Express() // Defining a variable to use the pre-defined functions from the Express package

app.use(Express.json()) // Using the JSON parsing middleware from the Express library
app.use(Express.urlencoded({extended: true})) // Using the URL encoding middleware from the Express library for reading URL-encoded data

app.set('view engine', 'ejs') // Setting the template engine to EJS

// Setting the port for the server to listen
app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})


// Variable declaration for performing the crud operation
let students = [
    {
        rollno: 1,
        name: 'Aravindan',
        course: 'MERN'
    },
    {
        rollno: 2,
        name: 'Pradeep',
        course: 'React'
    }
]


// Defined a GET request for '/' and rendering the 'home' EJS template with students data
app.get('/', (req, res)=>{
    res.render('home', {students})
})

// Defined a GET request for '/CreateStudents' to render the 'CreateStudents' EJS template
app.get('/CreateStudents', (req, res)=>{
    res.render('CreateStudents')
})

// Defined POST method for performing student enrollment - this request is triggered on student enrollment form submission
app.post('/enrollstudent', (req, res)=>{ 
    try{

        // EXTRACTING DATA FROM THE REQUEST'S BODY

        // DATA EXTRACTION METHOD:1
        // const roll = req.body.roll
        // const name = req.body.name
        // const course = req.body.course

        // DATA EXTRACTION METHOD:2
        const {roll, name, course} = req.body //data received through form submission

        // Validating that all required values are provided before processing the student enrollment
        if(roll&&name&&course){

            // Creating a temporary object to store the current student's data
            const tempStudent = {
                rollno: roll,
                name: name,
                course: course
            }
    
            // Adding the current student data to the main `students` array
            students.push(tempStudent)

            // returning a success response by rendering the success page
            return res.render('success', {message: 'student enrolled successfully!'})
        }
        else{
            // returning a failure response by rendering the fail page due to missing data
            return res.render('fail', {message: 'student enrollment failed!'})
        }
    }
    // Catch block for handling errors - captures any error during the execution of this API and executes the catch block
    catch(error){  // The error details are captured in the `error` parameter
        console.log('Error in student enrollment: ', error) // Logging the error message in the console for debugging and resolution
        
        // returning a failure response by rendering the fail page
        return res.render('fail', {message: 'Trouble in user enrollment! please contact our support team or try again later'})
    }
})

app.get('/about', (req, res)=>{
    res.send('<h1>Aboutpage</h1>')
})

app.get('*', (req, res)=>{
    res.send('<h1>page not found</h1>')
})