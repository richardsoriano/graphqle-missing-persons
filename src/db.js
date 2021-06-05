const posts = [{
    id: '10',
    title: 'Larry Middle Child',
    body: 'Why you',
    published: true,
    author: '1'
},{
    id: '11',
    title: 'Moe The Oldest',
    body: 'Boink',
    published: true,
    author: '1'
},{
    id: '12',
    title: 'Curly Smart Guy',
    body: 'Chubby, funniest',
    published:true,
    author: '1'
},{
    id: '13',
    title: 'Curly Chubby Guy',
    body: 'Way too Coronavirus Chubby, funniest',
    published:false,
    author: '3'
}]

const users = [{
    id: '1',
    name: 'Big Foot',
    email: 'big@cats.com',
    age: 3
}, {
    id: '2',
    name: 'Little Paw',
    email: 'little@cats.com',
    age: 3
}, {
    id: '3',
    name: 'Mr Wilson',
    email: 'wilson@cats.com',
    age: 6
}]
const comments = [{
    id: '101', 
    text: 'Zach Rules', 
    author: '1', 
    post: '10'
},{
    id: '102', 
    text: 'Kevin Smith kicks butt', 
    author: '2', 
    post: '11'
},{
    id: '103', 
    text: 'David Lynch is a loser', 
    author: '1', 
    post: '11'
},{
    id: '104', 
    text: 'Christopher Nolan should stop making movies', 
    author:'1', 
    post: '11'
},]

const db = {
    comments,
    users,
    posts,
}

export { db as default }