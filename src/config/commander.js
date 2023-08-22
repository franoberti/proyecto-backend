import { Command } from "commander";

export const program = new Command()

program
    .option('-d', 'Variables para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'production')
    .requiredOption('-u <user>', 'User que usa la app', 'No se ha declarado un User')
    .option('-l, --letters [letters...]', 'Especificar letras')

program.parse() //Cierra la configuracion de comandos