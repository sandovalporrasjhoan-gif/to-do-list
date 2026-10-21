const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const tareas = [
    {titulo: "Math", descripcion: "calculo", estado: "pendiente", pasos: ["Paso 1", "Paso 2"]},
    {titulo: "English", descripcion: "lenguaje", estado: "en progreso", pasos: ["Paso 1", "Paso 2", "Paso 3"]}
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});