const chalk = require('chalk');
const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const hbs = require('hbs');
const productRouter = require('./routes/product');
const bodyParser = require('body-parser');
const db = require('./utils/database');
const Product = require('./models/product');
const ProductImage = require('./models/productimages');


const Users = [];

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

console.log(chalk.blueBright('Meshulami'));
hbs.registerPartials(__dirname + '/views/partials');


app.use('/products', productRouter);

app.get('/', (req, response) => {
    response.render('home', {
        title: 'HomePage All Users',
        users: Users
    });
});

app.get('/register', (req, response) => {
    response.render('register');
});


app.get('/user/:userId', (request, response) => {

        const userId = parseInt(request.params.userId);
        const userIndex = Users.findIndex(user => user.id === userId);
        if(userIndex > -1){
            const {firstName, userName, email} = Users[userIndex];
            response.render('singleUser', {
                firstName, userName, email
            })
        }else{
            response.render('404');
        }
        

})


app.post('/new-user', (request, response) => {
    
    const {firstName, userName, email, password} = request.body;
    console.log({firstName, userName, email, password});
    //const {firstName, userName, email, password} = request.body;
    Users.push({firstName, userName, email, password, id: Users.length + 1});
    response.redirect('/');
});

app.get('/users', (req, res) => {
    console.log(chalk.blueBright('Users page'));
    res.render('users', { title: 'Users'});
})

app.get('/about', (req, res) => {
    console.log(chalk.blueBright('About page'));
    res.render('about', { title: 'About'});
})

app.use((req , res, next) =>{
    res.render('404');
})


app.listen(PORT, async () =>{
        try{
            await db.authenticate();
            await Product.sync();
            await ProductImage.sync();
            console.log(chalk.bgYellowBright(`Server is running on Port ${PORT}, Succssfully connected to Database`));
        }catch(e){
            console.log(chalk.bgRedBright(`Server is running on Port ${PORT}, Could not connected to Database`));
        }
});

