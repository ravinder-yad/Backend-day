const express = requre ('express')
const mongoos = requre ('mongoos')
const cors = requre ('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoos.conact('you')
.then(() => {
    console.log("yas");
    
    
}).catch((err) => {
    console.log("no");
    
});

const you = mongoos.schame({
    
})

