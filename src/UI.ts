import inquirer, { Answers } from 'inquirer';
import Task from "./models/Task.js";

enum Commands{
    Add = "Añadir una nueva tarea",
    Update = "Actualizar tarea",
    Complete = "Finalizar tarea",
    ShowAll = "Mostrar todas las tareas",
    GetTask = "Mostrar una tarea",
    Delete = "Borrar tarea",
    Quit = "Salir"
};

export default class UI {
    userName = "Raul";
    commands = Commands;
   
    async mainMenu(_ownerName: string, _numberIncompleteTasks: number, _tasks: Array<Task>): Promise<any>{
        console.clear();
        this.showInitInfo(_ownerName, _numberIncompleteTasks);
        this.showListTasks(_tasks);
        const answers = await inquirer.prompt({
            type: "list",
            name: "command",
            message: "¿Qué quieres hacer?",
            choices: Object.values(this.commands)
        });

        const answer = JSON.stringify(answers);

        return {answer: answer, commands: this.commands};
    }

    showInitInfo(_userName: string, _pendingTasks: number): void{
        this.show(`Tareas del usuario ${_userName}.`);
        this.show(`${_pendingTasks} tareas pendientes:`);
    }

    showListTasks(_tasks: Array<Task>): void{
        _tasks.forEach(task => {
            this.show(`${task.getName()}\t${task.isComplete()? '(Finalizada)' : ''}`);
        });
    }

    async addPrompt(_promptType: string, _promptName: string,_promptMessage: string): Promise<any>{
        const answers = await inquirer.prompt({
            type: _promptType,
            name: _promptName,
            message: _promptMessage
        });

        const answer = JSON.stringify(answers);
        return answer;       
    }

    show(_text: string): void{
        console.log(_text);
    }
}