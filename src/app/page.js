"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [whatelseProjects, setWhatelseProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [projectName, setProjectName] = useState("");
  const [newTask, setNewTask] = useState({
    item: "",
    color: "green",
  });

  useEffect(() => {
    const storedProjects = localStorage.getItem("whatelseProjects");
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      setWhatelseProjects(parsedProjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("whatelseProjects", JSON.stringify(whatelseProjects));
    console.log(JSON.parse(localStorage.getItem("whatelseProjects")));
  }, [whatelseProjects]);

  const handleChangeProjectName = (event) => {
    setProjectName(event.target.value);
  };

  const handleCreateProject = () => {
    if (projectName.trim() !== "") {
      const newProject = {
        name: projectName,
        list: [],
      };
      setWhatelseProjects([...whatelseProjects, newProject]);
      setProjectName("");
    }
  };

  const handleChangeSelectedProject = (e, project) => {
    setSelectedProject(project);
  };

  const handleDeleteProject = () => {
    if (selectedProject) {
      const updatedProjects = whatelseProjects.filter(
        (project) => project !== selectedProject
      );
      setWhatelseProjects(updatedProjects);
      setSelectedProject(null);
    }
  };

  const handleCheck = (event, task) => {
    const updatedTask = { ...task, done: event.target.checked };
    const updatedProjectList = selectedProject.list.map((item) =>
      item === task ? updatedTask : item
    );
    const updatedProject = { ...selectedProject, list: updatedProjectList };
    setSelectedProject(updatedProject);
    setWhatelseProjects((prevProjects) =>
      prevProjects.map((project) =>
        project === selectedProject ? updatedProject : project
      )
    );
  };

  const handleChangeNewItem = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (selectedProject && newTask.item.trim() !== "") {
      const updatedProjectList = [
        ...selectedProject.list,
        { ...newTask, done: false },
      ];
      const updatedProject = {
        ...selectedProject,
        list: updatedProjectList,
      };
      setSelectedProject(updatedProject);
      setWhatelseProjects((prevProjects) =>
        prevProjects.map((project) =>
          project === selectedProject ? updatedProject : project
        )
      );
      setNewTask({ item: "", color: "red" });
    }
  };

  const handleDeleteItem = (e, task) => {
    const updatedTaskList = selectedProject.list.filter(
      (item) => item !== task
    );
    const updatedProject = { ...selectedProject, list: updatedTaskList };
    setSelectedProject(updatedProject);
    setWhatelseProjects((prevProjects) =>
      prevProjects.map((project) =>
        project === selectedProject ? updatedProject : project
      )
    );
  };

  return (
    <>
      <header>
        <h1>Whatelse</h1>
        <p>
          Une appli pour se souvenir des trucs que tu oublies parce que t'as
          d'autre trucs à te souvenirs... mais que tu te souviens plus... <br />
          Bref. C'est une todolist.
        </p>
      </header>
      <main>
        <section id="projects">
          <h2>Sur quel projet bossez-vous aujourd'hui ?</h2>
          <div id="projectsList">
            {whatelseProjects.map((project) => (
              <button
                key={project.name}
                onClick={(e) => handleChangeSelectedProject(e, project)}
              >
                {project.name}
              </button>
            ))}
          </div>
          <div id="projectCreation">
            <p className="guideLine">
              Un nouveau projet en tête ? donnez-lui un nom :
            </p>
            <input
              type="text"
              name="projectName"
              id="projectName"
              placeholder="nom du projet"
              value={projectName}
              onChange={(e) => {
                handleChangeProjectName(e);
              }}
            />
            <button
              onClick={() => {
                handleCreateProject();
              }}
            >
              Créer
            </button>
          </div>
        </section>
        {selectedProject && (
          <section id="tasks">
            <h2>
              Projet : "{selectedProject.name}"
              <button className="suppressorBtn" onClick={handleDeleteProject}>
                X
              </button>
            </h2>
            <p className="guideLine">ajouter un item :</p>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                name="item"
                value={newTask.item}
                onChange={handleChangeNewItem}
                placeholder="Nom de l'item"
                required
              />
              <select
                name="color"
                value={newTask.color}
                onChange={handleChangeNewItem}
              >
                <option value="red">rouge</option>
                <option value="green">vert</option>
                <option value="blue">bleu</option>
                <option value="yellow">jaune</option>
              </select>
              <input type="submit" value="Ajouter" />
            </form>
            <ul>
              {selectedProject.list.map((task) => (
                <li key={task.item} className={task.color}>
                  <p>{task.item}</p>
                  <div className="checkerBtn">
                    <input
                      type="checkbox"
                      name="done"
                      onChange={(e) => handleCheck(e, task)}
                      checked={task.done}
                    />
                    <p>ok</p>
                  </div>
                  <button
                    className="suppressorBtn"
                    onClick={(e) => handleDeleteItem(e, task)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer>
        <p> © Copyright 2023 - Tout droit réservé</p>
        <p>développé par MajorDown</p>
      </footer>
    </>
  );
}
