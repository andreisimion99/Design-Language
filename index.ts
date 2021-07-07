import * as fs from 'fs';


let x1: number = 0;
let y1: number = 0;
let pen_color: number[] = [0, 0, 0];
let fill_color: number[] = [255, 255, 255];
let pen_width: number = 1;
let file1_name: string = process.argv[2];
let file2_name: string = process.argv[3];
let list_name: string[] = ["zero"];
let list_val: any[] = [0]
let n: number = 0;
let flag_loop: boolean = false;
let loop_list: string[] = ['0'];
let flag_while: boolean = false;
let while_list: string[] = ['0'];
let flag_if: boolean = false;
let if_list: string[] = ['0'];
let c: number = 0;



//SCRIERE IN CANVAS.SVG (INCEPUT)
let to_write: string = "<svg width=\"1024\" height=\"768\">";
try {
    fs.writeFileSync(file2_name, to_write);
} catch(error) {
    console.log(error);
}

//CITIRE DIN DESIGN.DSN
try {
    const data = fs.readFileSync(file1_name, 'ascii');
    const lines = data.split(/\r?\n/);
    let i: number = 1;

    lines.forEach((line) => {
        line = line.trim();
        line = line.toLowerCase();


        if(line[0] != '&'){
            if(line.includes(':')){
                line = line.replace(':', ' ');
                line = line.replace(/\s+/g, ' ');

                let st: string[];
                st = line.split(" ");

                if(flag_loop === true){
                    loop_list.push(line);
                }
                if(flag_while === true){
                    while_list.push(line);
                }
                if(flag_if === true){
                    if_list.push(line);
                }

                if(st[0] === "position"){
                    if(st.length - 1 === 2){
                        if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                            x1 = Number(st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            x1 = list_val[list_name.indexOf(st[1])]; 
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": POSITION parameter 1 requires a number or a variable, you wrote " +st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                            console.log("ERROR LINE " +i +": POSITION parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                        }

                        if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                            y1 = Number(st[2]);
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                            y1 = list_val[list_name.indexOf(st[2])]; 
                        }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                            console.log("ERROR LINE " +i +": POSITION parameter 2 requires a number or a variable, you wrote " +st[2]);
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                            console.log("ERROR LINE " +i +": POSITION parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                        }
                    }else{
                        console.log("ERROR LINE " +i +":POSITION has 2 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "line"){
                    if(st.length - 1 === 3){
                        if(st[3] === "location"){  //AL TREILEA ARGUMENT (LOCATION)
                            let x2: number = 0;
                            let y2: number = 0;
                            let flag: boolean = true;

                            if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                                x2 = Number(st[1]);
                            }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                                x2 = list_val[list_name.indexOf(st[1])]; 
                            }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                                console.log("ERROR LINE " +i +": LINE parameter 1 requires a number or a variable, you wrote " +st[1]);
                                flag = false;
                            }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                                console.log("ERROR LINE " +i +": LINE parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                                flag = false;
                            }
    
                            if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                                y2 = Number(st[2]);
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                                y2 = list_val[list_name.indexOf(st[2])]; 
                            }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                                console.log("ERROR LINE " +i +": LINE parameter 2 requires a number or a variable, you wrote " +st[2]);
                                flag = false;
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                                console.log("ERROR LINE " +i +": LINE parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                                flag = false;
                            }
                            //SCRIERE IN CANVAS.SVG
                            if(flag === true){
                                let to_write: string = "\n<line x1=\""+x1+"\" y1=\""+y1+"\" x2=\""+x2+"\" y2=\""+y2+"\" style=\"stroke:rgb("+pen_color[0]+","+pen_color[1]+","+pen_color[2]+");stroke-width:"+pen_width+"\" />";
                                try {
                                    fs.appendFileSync(file2_name, to_write);
                                } catch(error) {
                                    console.log(error);
                                }
                            }
                            x1 = x2;
                            y1 = y2;

                        }else if(st[3] === "polar"){ //AL TREILEA ARGUMENT (POLAR)
                            let x2: number = 0;
                            let y2: number = 0;
                            let angleRadians: number = 0;
                            let flag: boolean = true;

                            if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){ //VERIFICARE SI CONVERSIE UNGHI
                                angleRadians = (Math.PI / 180.0) * Number(st[2]);
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                                angleRadians = (Math.PI / 180.0) * Number(list_val[list_name.indexOf(st[2])]);
                            }

                            if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                                x2 = x1 + Math.cos(angleRadians) * Number(st[1]);
                            }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                                x2 = x1 + Math.cos(angleRadians) * Number(list_val[list_name.indexOf(st[1])]); 
                            }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                                console.log("ERROR LINE " +i +": LINE parameter 1 requires a number or a variable, you wrote " +st[1]);
                                flag = false;
                            }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                                console.log("ERROR LINE " +i +": LINE parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                                flag = false;
                            }
    
                            if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                                y2 = y1 - Math.sin(angleRadians) * Number(st[1]);
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                                y2 = y1 - Math.sin(angleRadians) * Number(list_val[list_name.indexOf(st[1])]); 
                            }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                                console.log("ERROR LINE " +i +": LINE parameter 2 requires a number or a variable, you wrote " +st[2]);
                                flag = false;
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                                console.log("ERROR LINE " +i +": LINE parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                                flag = false;
                            }
                            x2 = Number(x2.toPrecision(3));
                            y2 = Number(y2.toPrecision(2));
                            //SCRIERE IN CANVAS.SVG
                            if(flag === true){
                                let to_write: string = "\n<line x1=\""+x1+"\" y1=\""+y1+"\" x2=\""+x2+"\" y2=\""+y2+"\" style=\"stroke:rgb("+pen_color[0]+","+pen_color[1]+","+pen_color[2]+");stroke-width:"+pen_width+"\" />";
                                try {
                                    fs.appendFileSync(file2_name, to_write);
                                } catch(error) {
                                    console.log(error);
                                }
                            }
                            x1 = x2;
                            y1 = y2;
                        }else{
                            console.log("ERROR LINE (" +i +"): LINE parameter 3 needs to be one of (location, polar), you wrote " +st[3]);
                        }
                    }else{
                        console.log("ERROR LINE " +i +":LINE has 3 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "circle"){
                    if(st.length - 1 === 3){
                        let x2: number = 0;
                        let y2: number = 0;
                        let r: number = 0;
                        let flag: boolean = true;

                        if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                            x2 = Number(st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            x2 = list_val[list_name.indexOf(st[1])]; 
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 1 requires a number or a variable, you wrote " +st[1]);
                            flag = false;
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                            flag = false;
                        }else if(st[1][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[1].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                            y2 = Number(st[2]);
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                            y2 = list_val[list_name.indexOf(st[2])]; 
                        }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 2 requires a number or a variable, you wrote " +st[2]);
                            flag = false;
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                            flag = false;
                        }else if(st[2][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[2].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[3])) === 'number' && st[3][0] != '%'){  //AL TREILEA ARGUMENT
                            r = Number(st[3]);
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(Number(list_val[list_name.indexOf(st[3])])) === 'number'){
                            r = list_val[list_name.indexOf(st[3])]; 
                        }else if(typeof(Number(st[3])) != 'number' && st[3][0] != '%'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 3 requires a number or a variable, you wrote " +st[3]);
                            flag = false;
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) != 'number'){
                            console.log("ERROR LINE " +i +": CIRCLE parameter 3 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[3])]);
                            flag = false;
                        }else if(st[3][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[3].substr(1));
                            flag = false;
                        }

                        //SCRIERE IN CANVAS.SVG
                        if(flag === true){
                            let to_write: string = "\n<circle cx=\""+x2+"\" cy=\""+y2+"\" r=\""+r+"\" stroke=\"rgb("+pen_color[0]+","+pen_color[1]+","+pen_color[2]+")\" stroke-width=\""+pen_width+"\" fill=\"rgb("+fill_color[0]+","+fill_color[1]+","+fill_color[2]+")\" />";
                            try {
                                fs.appendFileSync(file2_name, to_write);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    }else{
                        console.log("ERROR LINE " +i +": CIRCLE has 3 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "ellipse"){
                    if(st.length - 1 === 4){
                        let x2: number = 0;
                        let y2: number = 0;
                        let r1: number = 0;
                        let r2: number = 0;
                        let flag: boolean = true;

                        if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                            x2 = Number(st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            x2 = list_val[list_name.indexOf(st[1])]; 
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 1 requires a number or a variable, you wrote " +st[1]);
                            flag = false;
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                            flag = false;
                        }else if(st[1][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[1].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                            y2 = Number(st[2]);
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                            y2 = list_val[list_name.indexOf(st[2])]; 
                        }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 2 requires a number or a variable, you wrote " +st[2]);
                            flag = false;
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                            flag = false;
                        }else if(st[2][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[2].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[3])) === 'number' && st[3][0] != '%'){  //AL TREILEA ARGUMENT
                            r1 = Number(st[3]);
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(Number(list_val[list_name.indexOf(st[3])])) === 'number'){
                            r1 = list_val[list_name.indexOf(st[3])]; 
                        }else if(typeof(Number(st[3])) != 'number' && st[3][0] != '%'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 3 requires a number or a variable, you wrote " +st[3]);
                            flag = false;
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) != 'number'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 3 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[3])]);
                            flag = false;
                        }else if(st[3][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[3].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[4])) === 'number' && st[4][0] != '%'){  //AL PATRULEA ARGUMENT
                            r2 = Number(st[4]);
                        }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(Number(list_val[list_name.indexOf(st[4])])) === 'number'){
                            r2 = list_val[list_name.indexOf(st[4])]; 
                        }else if(typeof(Number(st[4])) != 'number' && st[4][0] != '%'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 4 requires a number or a variable, you wrote " +st[4]);
                            flag = false;
                        }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(list_val[list_name.indexOf(st[4])]) != 'number'){
                            console.log("ERROR LINE " +i +": ELLIPSE parameter 4 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[4])]);
                            flag = false;
                        }else if(st[4][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[4].substr(1));
                            flag = false;
                        }

                        //SCRIERE IN CANVAS.SVG
                        if(flag === true){
                            let to_write: string = "\n<ellipse cx=\""+x2+"\" cy=\""+y2+"\" rx=\""+r1+"\" ry=\""+r2+"\" style=\"fill:rgb("+fill_color[0]+","+fill_color[1]+","+fill_color[2]+");stroke:rgb("+pen_color[0]+","+pen_color[1]+","+pen_color[2]+");stroke-width:"+pen_width+"\" />";
                            try {
                                fs.appendFileSync(file2_name, to_write);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    }else{
                        console.log("ERROR LINE (" +i +"): ELLIPSE has 4 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "rectangle"){
                    if(st.length - 1 === 4){
                        let xl: number = 0;
                        let yl: number = 0;
                        let xr: number = 0;
                        let yr: number = 0;
                        let flag: boolean = true;

                        if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){  //PRIMUL ARGUMENT
                            xl = Number(st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            xl = list_val[list_name.indexOf(st[1])]; 
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 1 requires a number or a variable, you wrote " +st[1]);
                            flag = false;
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) != 'number'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                            flag = false;
                        }else if(st[1][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[1].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                            yl = Number(st[2]);
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) === 'number'){
                            yl = list_val[list_name.indexOf(st[2])]; 
                        }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 2 requires a number or a variable, you wrote " +st[2]);
                            flag = false;
                        }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(Number(list_val[list_name.indexOf(st[2])])) != 'number'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                            flag = false;
                        }else if(st[2][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[2].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[3])) === 'number' && st[3][0] != '%'){  //AL TREILEA ARGUMENT
                            xr = Number(st[3]);
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(Number(list_val[list_name.indexOf(st[3])])) === 'number'){
                            xr = list_val[list_name.indexOf(st[3])]; 
                        }else if(typeof(Number(st[3])) != 'number' && st[3][0] != '%'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 3 requires a number or a variable, you wrote " +st[3]);
                            flag = false;
                        }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(Number(list_val[list_name.indexOf(st[3])])) != 'number'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 3 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[3])]);
                            flag = false;
                        }else if(st[3][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[3].substr(1));
                            flag = false;
                        }

                        if(typeof(Number(st[4])) === 'number' && st[4][0] != '%'){  //AL PATRULEA ARGUMENT
                            yr = Number(st[4]);
                        }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(Number(list_val[list_name.indexOf(st[4])])) === 'number'){
                            yr = list_val[list_name.indexOf(st[4])]; 
                        }else if(typeof(Number(st[4])) != 'number' && st[4][0] != '%'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 4 requires a number or a variable, you wrote " +st[4]);
                            flag = false;
                        }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(Number(list_val[list_name.indexOf(st[4])])) != 'number'){
                            console.log("ERROR LINE " +i +": RECTANGLE parameter 4 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[4])]);
                            flag = false;
                        }else if(st[4][0] === '%'){
                            console.log("ERROR LINE ("+i+"): Undefined variable "+st[4].substr(1));
                            flag = false;
                        }
                        //SCRIERE IN CANVAS.SVG
                        if(flag === true){
                            let to_write: string = "\n<polygon points=\""+xl+","+yl+" "+xr+","+yl+" "+xr+","+yr+" "+xl+","+yr+"\" style=\"fill:rgb("+fill_color[0]+","+fill_color[1]+","+fill_color[2]+");stroke-width:"+pen_width+";stroke:rgb("+pen_color[0]+","+pen_color[1]+","+pen_color[2]+")\" />";
                            try {
                                fs.appendFileSync(file2_name, to_write);
                            } catch(error) {
                                console.log(error);
                            }
                        }
                    }else{
                        console.log("ERROR LINE " +i +": RECTANGLE has 4 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "color"){
                    if(st.length - 1 === 4){
                        let r: number = 0;
                        let g: number = 0;
                        let b: number = 0;
                        let flag: boolean = true;

                        if(st[1] === "pen"){  //PEN
                            if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                                r = Number(st[2]);
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) === 'number'){
                                r = list_val[list_name.indexOf(st[2])]; 
                            }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 2 requires a number or a variable, you wrote " +st[2]);
                                flag = false;
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                                flag = false;
                            }
    
                            if(typeof(Number(st[3])) === 'number' && st[3][0] != '%'){  //AL TREILEA ARGUMENT
                                g = Number(st[3]);
                            }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) === 'number'){
                                g = list_val[list_name.indexOf(st[3])]; 
                            }else if(typeof(Number(st[3])) != 'number' && st[3][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 3 requires a number or a variable, you wrote " +st[3]);
                                flag = false;
                            }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 3 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[3])]);
                                flag = false;
                            }
        
                            if(typeof(Number(st[4])) === 'number' && st[4][0] != '%'){  //AL PATRULEA ARGUMENT
                                b = Number(st[4]);
                            }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(list_val[list_name.indexOf(st[4])]) === 'number'){
                                b = list_val[list_name.indexOf(st[4])];
                            }else if(typeof(Number(st[4])) != 'number' && st[4][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 4 requires a number or a variable, you wrote " +st[4]);
                                flag = false;
                            }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(list_val[list_name.indexOf(st[4])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 4 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[4])]);
                                flag = false;
                            }
                        }else if(st[1] === "fill"){ //FILL
                            if(typeof(Number(st[2])) === 'number' && st[2][0] != '%'){  //AL DOILEA ARGUMENT
                                r = Number(st[2]);
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) === 'number'){
                                r = list_val[list_name.indexOf(st[2])]; 
                            }else if(typeof(Number(st[2])) != 'number' && st[2][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 2 requires a number or a variable, you wrote " +st[2]);
                                flag = false;
                            }else if(st[2][0] === '%' && list_name.includes(st[2]) && typeof(list_val[list_name.indexOf(st[2])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 2 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[2])]);
                                flag = false;
                            }
    
                            if(typeof(Number(st[3])) === 'number' && st[3][0] != '%'){  //AL TREILEA ARGUMENT
                                g = Number(st[3]);
                            }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) === 'number'){
                                g = list_val[list_name.indexOf(st[3])]; 
                            }else if(typeof(Number(st[3])) != 'number' && st[3][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 3 requires a number or a variable, you wrote " +st[3]);
                                flag = false;
                            }else if(st[3][0] === '%' && list_name.includes(st[3]) && typeof(list_val[list_name.indexOf(st[3])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 3 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[3])]);
                                flag = false;
                            }
        
                            if(typeof(Number(st[4])) === 'number' && st[4][0] != '%'){  //AL PATRULEA ARGUMENT
                                b = Number(st[4]);
                            }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(list_val[list_name.indexOf(st[4])]) === 'number'){
                                b = list_val[list_name.indexOf(st[4])];
                            }else if(typeof(Number(st[4])) != 'number' && st[4][0] != '%'){
                                console.log("ERROR LINE " +i +": COLOR parameter 4 requires a number or a variable, you wrote " +st[4]);
                                flag = false;
                            }else if(st[4][0] === '%' && list_name.includes(st[4]) && typeof(list_val[list_name.indexOf(st[4])]) != 'number'){
                                console.log("ERROR LINE " +i +": COLOR parameter 4 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[4])]);
                                flag = false;
                            }
                        }else{
                            console.log("ERROR LINE (" +i +"): COLOR parameter 1 needs to be one of (pen, fill), you wrote " +st[1]);
                        }
                        //SCRIERE IN CANVAS.SVG
                        if(flag === true && st[1] === "pen"){
                            pen_color[0] = r;
                            pen_color[1] = g;
                            pen_color[2] = b;
                        }else if(flag === true && st[1] === "fill"){
                            fill_color[0] = r;
                            fill_color[1] = g;
                            fill_color[2] = b;
                        }
                    }else{
                        console.log("ERROR LINE " +i +":COLOR has 4 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "loop"){
                    if(st.length - 1 === 1){
                        if(typeof(Number(st[1])) === 'number' && st[1][0] != '%'){
                            c = Number(st[1]);
                            flag_loop = true;
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            c = Number(list_val[list_name.indexOf(st[1])]);
                            flag_loop = true;
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": LOOP parameter 1 requires a number or a variable, you wrote " +st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                            console.log("ERROR LINE " +i +": LOOP parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                        }

                    }else{
                        console.log("ERROR LINE (" +i +"): LOOP has 1 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "while"){
                    //tralala
                }else if(st[0] === "repeat"){
                    if(st.length - 1 === 0){
                        if(flag_loop === true || flag_while === true){
                            if(flag_loop === true){
                                flag_loop = false;
                                loop_list.pop();
                                while(c > 1){
                                    //-------
                                    c--;
                                }
                            }
                            if(flag_while === true){
                                flag_while = false;
                                while_list.pop();
                                while(c > 1){
                                    c--;
                                }
                            }
                        }else if(flag_loop === false && flag_while === false){
                            console.log("ERROR LINE ("+i+"): REPEAT and no LOOP");
                        }

                    }else{
                        console.log("ERROR LINE " +i +": REPEAT has 0 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "if"){
                    if(st.length - 1 === 1){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number'){
                            if(Number(list_val[list_name.indexOf(st[1])]) != 0){
                                //-------
                            }else{
                                //-------
                            }
                        }else if(typeof(Number(st[1])) != 'number' && st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": IF parameter 1 requires a number or a variable, you wrote " +st[1]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && typeof(list_val[list_name.indexOf(st[1])]) != 'number'){
                            console.log("ERROR LINE " +i +": IF parameter 1 requires a number or a variable, you wrote " +list_val[list_name.indexOf(st[1])]);
                        }

                    }else{
                        console.log("ERROR LINE (" +i +"): IF has 1 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "else"){
                    //--------
                }else if(st[0] === "end"){
                    //--------
                }else if(st[0] === "set"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            list_val[list_name.indexOf(st[1])] = st[2];
                        }else if(st[1][0] === '%' && st[2][0] != '%'){
                            list_name.push(st[1]);
                            list_val.push(st[2]);
                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[2])];
                        }else if(st[1][0] === '%' && st[2][0] === '%' && list_name.includes(st[2])){
                            list_name.push(st[1]);
                            list_val.push(list_val[list_name.indexOf(st[2])]);
                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": SET parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": SET has 2 parameters, you wrote " +(st.length-1));
                    }

                }else if(st[0] === "add"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) + Number(st[2])
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] + st[2];
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) + Number(list_val[list_name.indexOf(st[2])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] + list_val[list_name.indexOf(st[2])];
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": ADD parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": ADD has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "sub"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) - Number(st[2])
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] - Number(st[2]);
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) - Number(list_val[list_name.indexOf(st[2])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] - list_val[list_name.indexOf(st[2])];
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": SUB parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": SUB has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "mul"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) * Number(st[2])
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] * Number(st[2]);
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) * Number(list_val[list_name.indexOf(st[2])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] * list_val[list_name.indexOf(st[2])];
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": MUL parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": MUL has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "div"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) / Number(st[2])
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] / Number(st[2]);
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) / Number(list_val[list_name.indexOf(st[2])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] / list_val[list_name.indexOf(st[2])];
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": DIV parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": DIV has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "idiv"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) / Number(st[2])
                                list_val[list_name.indexOf(st[1])] = parseInt(list_val[list_name.indexOf(st[1])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] / Number(st[2]);
                                list_val[list_name.indexOf(st[1])] = parseInt(list_val[list_name.indexOf(st[1])]);
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) / Number(list_val[list_name.indexOf(st[2])]);
                                list_val[list_name.indexOf(st[1])] = parseInt(list_val[list_name.indexOf(st[1])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] / list_val[list_name.indexOf(st[2])];
                                list_val[list_name.indexOf(st[1])] = parseInt(list_val[list_name.indexOf(st[1])]);
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": DIV parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": DIV has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(st[0] === "mod"){
                    if(st.length - 1 === 2){
                        if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] != '%'){  //VARIABILA
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) % Number(st[2])
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] % Number(st[2]);
                            }

                        }else if(st[1][0] === '%' && list_name.includes(st[1]) && st[2][0] === '%' && list_name.includes(st[2])){
                            if(typeof(Number(list_val[list_name.indexOf(st[1])])) === 'number' && typeof(Number(st[2])) === 'number'){
                                list_val[list_name.indexOf(st[1])] = Number(list_val[list_name.indexOf(st[1])]) % Number(list_val[list_name.indexOf(st[2])]);
                            }else{
                                list_val[list_name.indexOf(st[1])] = list_val[list_name.indexOf(st[1])] % list_val[list_name.indexOf(st[2])];
                            }

                        }else if(st[1][0] != '%'){
                            console.log("ERROR LINE " +i +": MOD parameter 1 requires a variable, you wrote " +st[1]);
                        }

                    }else{
                        console.log("ERROR LINE " +i +": MOD has 2 parameters, you wrote " +(st.length-1));
                    }
                }else if(flag_loop === true && loop_list.length === 0){
                    console.log("ERROR LINE ("+i+"): LOOP with no REPEAT");
                }else if(flag_while === true && while_list.length === 0){
                    console.log("ERROR LINE ("+i+"): WHILE with no REPEAT");
                }else{
                    console.log("ERROR LINE" +i +": Unknown statement " +st[0]);
                }
            }
        }
        i++;
    });
    //SCRIERE IN CANVAS.SVG (SFARSIT)
    let to_write: string = "\n</svg>";
    try {
        fs.appendFileSync(file2_name, to_write);
    } catch(error) {
        console.log(error);
    }
} catch (err) {
    console.error(err);
}


//SCRIERE IN CANVAS.SVG
//<line x1="0" y1="0" x2="200" y2="200" style="stroke:green;stroke-width:2" />
//<circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"1\" fill=\"white\" />
//<ellipse cx="200" cy="80" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2" />
//<rect width="300" height="100" style="fill:blue;stroke-width:3;stroke:black" />
// let to_write: string = "<svg width=\"10000\" height=\"10000\"><circle cx=\"50\" cy=\"50\" r=\"40\" stroke=\"black\" stroke-width=\"1\" fill=\"white\" /></svg>";
// try {
//     fs.writeFileSync(file2_name, to_write);
// } catch(error) {
//     console.log(error);
// }