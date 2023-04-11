let diff = "normal"
let levels = []
let worldMap = []
let canSave = true

const authorSites =  {
 "TastyPI": "https://thetastypi.github.io/",
 "Yhvr": "https://yhvr.me/"
}
const difficulties = [
 {
  id: "easier",
  name: "EZR",
  color: "#bbffff",
  dark_color: "#223333",
  authors: ["TastyPI","Yhvr","gapples2"]
 },
 {
  id: "easy",
  name: "EZ",
  color: "#bbffbb",
  dark_color: "#223322",
  authors: ["TastyPI","Yhvr"]
 },
 {
  id: "normal",
  name: "NORMAL",
  color: "#ffffff",
  dark_color: "#333336",
  save_key: "",
  authors: ["TastyPI","Yhvr"]
 },
 {
  id: "hard",
  name: "HARD",
  color: "#ffbbbb",
  dark_color: "#332222",
  authors: ["TastyPI","Yhvr"]
 }
]

const diff_index = {}
const diff_name_index = {}
difficulties.forEach((o,i)=>{
 diff_index[o.id]=i
 diff_name_index[o.name]=i
 let s = document.createElement("script")
 s.async = true
 s.src = "levels/"+o.id+".js"
 document.head.appendChild(s)
 let op = document.createElement("option")
 op.textContent = o.name
 op.value = o.id
 document.getElementById("diff-select").appendChild(op)
})
document.getElementById("diff-select").value = "normal"

//document.getElementById("difficulties").max = difficulties.length-1
document.getElementById("diff-select").addEventListener("change",()=>{
 let name = document.getElementById("diff-select").value
 let val = diff_index[name]
 //document.getElementById("difficulty").textContent = name
 loadDifficulty(difficulties[val].id)
})

function loadDifficulty(d,sav=true){
 if(sav)save()
 canSave = false
 let di = diff_index[d]
 if(!difficulties[di])throw new Error(`Difficulty "${d}" does not exist.`)
 diff = difficulties[di].save_key??("-"+difficulties[di].name)
 if(!difficulties[di].level){
  let s = document.createElement("script")
  s.async = false
  s.src = `${d}.js`
  document.head.appendChild(s)
 }
 levels = difficulties[di].level
 worldMap = difficulties[di].world_map
 document.body.style.backgroundColor = `${difficulties[di][options.darkMode?"dark_color":"color"]}`
 document.body.style.opacity = "0%"
 fade.phase = 1
 fade.time = 2
 let a = difficulties[di].authors
 for(let x=0;x<a.length;x++)a[x]=authorSites[a[x]]?`<a href="${authorSites[a[x]]}">${a[x]}</a>`:a[x]
 let atxt = a.length==2?(a[0]+" and "+a[1]):(a.slice(0,-1).join(", ")+", and "+a[a.length-1])
 document.getElementById("authors").innerHTML = atxt
 loadDiff()
 respawn(false)
 canSave = true
 save()
}