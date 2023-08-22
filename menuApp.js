class Vehicle {
    constructor (name, vehicleType){
        this.name = name;
        this.vehicleType = vehicleType;
    }
    describe(){
        return`${this.name} uses a ${this.vehicleType}.`;
    }
}

class Character {
    constructor(name){
        this.name = name;
        this.characters = [];  // An array to store Character instances
    }

    addCharacter(character){
        if (character instanceof Character){
            this.characters.push(character);
        } else {
            throw new Error(`You can only add an instance of Character. Argument is not a character: ${character}`);
        }
    }
}  

class Menu{
    constructor(){
        this.character = [];
        this.selectedCharacter = null;
    }
    start(){
        let selection = this.showMainMenuOptions();

        while (selection != 0){
            switch(selection){
                case '1':
                    this.createCharacter();
                    break;
                case '2':
                    this.viewCharacter();
                    break;
                case '3':
                    this.deleteCharacter();
                    break;
                case '4':
                    this.displayCharacter();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
        window.location.href = 'https://www.youtube.com/watch?v=2qgxAHW1w78'
    }

    createVehicle(character){
        let vehicleName = prompt(`Enter a name for the vehicle of ${character.name}:`);
        character.vehicleType = new Vehicle(vehicleName); // Assuming you have a Vehicle class
        alert(`${vehicleName} has been added as the vehicle for ${character.name}.`);
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) Create Character
        2) View Character
        3) Delete Character
        4) Display Character
        `)
    }
    
    showCharacterMenuOptions(characterInfo){
        return prompt(`
        0) back
        1) create player
        2) delete player
        ----------------------
        `)
    }

    createCharacter() {
        let name = prompt('Enter name for your character:');
        this.character.push(new Character(name));
    
        let createVehicleOption = prompt(`Do you want to create a vehicle for ${name}? (yes/no)`);
    
        if (createVehicleOption.toLowerCase() === 'yes') {
            this.createVehicle(new Character(name));
        }
    }


    displayCharacter(){
        let characterString = '';
        for (let i  = 0; i < this.character.length; i++){
            characterString += i + ') ' + this.character[i].name + '\n';
        }
        alert(characterString);
    }

    deleteCharacter(){
        let index = prompt('Enter the index of the character you wish to delete:');
        if (index > -1 && index < this.character.length){
            this.character.splice(index, 1);
        }
    }

    viewCharacter(){
        let index = prompt('Enter the index of the team you wish to view:');
        if (index > -1 && index < this.character.length){
            this.selectedCharacter = this.character[index];
            let description = 'Character Name: ' + this.selectedCharacter.name + '\n';

            for(let i = 0; i < this.selectedCharacter.vehicle.length; i++){
               description += i + ') ' + this.selectedCharacter.vehicle[i].name +
                ' - ' + this.selectedCharacter.vehicle[i].position + '\n';
            }

            let selection = this.showCharacterMenuOptions(description);
            switch(selection){
            case '1':
                this.createCharacter();
                break;
            case '2':
                this.deleteCharacter();
            }
        }
    }
}
let menu = new Menu();
menu.start();
