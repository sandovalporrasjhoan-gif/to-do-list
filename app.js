const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const tareas = [
    {titulo: "Math", descripcion: "calculo", estado: "pendiente", pasos: ["Paso 1", "Paso 2"]},
    {titulo: "English", descripcion: "lenguaje", estado: "pendiente", pasos: ["Paso 1", "Paso 2", "Paso 3"]},
    {titulo: "History", descripcion: "historia", estado: "completado", pasos: ["Paso 1", "Paso 2","paso"]}

];

app.get ('/tareas', (req, res)=>{
    console.log( `query:`, req.query);
    res.json(tareas);
});

app.get('/tareas/estado/pendiente', (req, res) => {
    console.log("Mis tareas actuales son:", tareas); 
    const filtered = tareas.filter(t => t.estado === "pendiente");
    
    if(filtered.length > 0){
        res.json(filtered)
    } else{
        res.status(404).json({ error: "no hay tareas con ese estado" });
    }
});

app.get('/tareas/:title', (req, res) => {
    const taskTitle = String(req.params.title);
    console.log("nombre", req.params);
    const single = tareas.find(t => t.titulo == taskTitle);

    if(single){
         res.json(single)
    } else{
        console.log("no esta");
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

app.get('/tareas/estado/completado', (req, res) => {
    console.log("query", req.query);
    const filter = tareas.filter(t => t.estado === "completado");
    if(filter.length > 0){
        res.json(filter)
    } else{
        console.log("no hay tareas con ese estado");
        res.status(404).json({ error: "no hay tareas con ese estado" });
    }
});

app.post('/agregar/tarea', (req, res) => {
    console.log("body", req.body);
    tareas.push(req.body);
    res.json({
        titulo: req.body.titulo, 
        descripcion: req.body.descripcion, 
        estado: req.body.estado, 
        pasos: req.body.pasos
    });
});

app.put('/tareas/:title', (req, res) => {
    console.log("body", req.body);
    const taskTitle = String(req.params.title);
    const taskIndex = tareas.findIndex(t => t.titulo === taskTitle);
    if (taskIndex !== -1) {
        tareas[taskIndex] = { ...tareas[taskIndex], ...req.body };
        res.json(tareas[taskIndex]);
    } else {
        console.log("no esta");
        res.status(404).json({ error: "Tarea no encontrada" });
    }
});

app.patch('/tareas/:title', (req, res) => {
    console.log("body", req.body);
    const taskTitle = String(req.params.title);
    const taskIndex = tareas.findIndex(t => t.titulo === taskTitle);
    if (taskIndex !== -1) {
        tareas[taskIndex] = { ...tareas[taskIndex], ...req.body };
        res.json(tareas[taskIndex]);
    } else {
        console.log("no esta bro");
        res.status(404).json({ message: "Tarea no encontrada" });
    }
});


     app.delete('/tareas/:title', (req, res) => { 
                console.log('query', req.query)
        const title = String(req.params.title); 
        const tasktitle = tareas.findIndex((t) => t.titulo === title); 
        if (tasktitle === -1) {
             return res.status(404).json({ exito: false, mensaje: `No se encontró ninguna tarea con el ID ${title}` }); 
            } const tareaEliminada = tareas.splice(tasktitle, 1)[0];
             res.status(200).json({ 
                exito: true, 
                mensaje: 'Tarea eliminada exitosamente', 
                data: tareaEliminada 
            }); 
});  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});