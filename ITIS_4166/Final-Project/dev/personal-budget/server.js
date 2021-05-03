// Budget API

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 50
        },
        {
            title: 'Rent',
            budget: 450
        },
        {
            title: 'Groceries',
            budget: 100
        },
        {
            title: 'Clothes',
            budget: 40
        },
        {
            title: 'Bills',
            budget: 80
        },
        {
            title: 'Insurance',
            budget: 30
        },
        {
            title: 'Life',
            budget: 50
        },
    ]
};

app.get('/*', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});