

let arrayOfUser = [
    {name: 'Godmin', image: 'someurl', email: 'some@thing.com'},
    {name: 'Ebube', image: 'someurl', email: 'some@thing.com'},
    {name: 'Josh', image: 'someurl', email: 'some@thing.com'},
]

let searchParm = 'ebu'

let user = arrayOfUser.find(x => x.name.toLowerCase().includes(searchParm.toLowerCase()));