import fetch from "node-fetch";

    const corparationSystemURL = "https://api.le-systeme-solaire.net/rest/bodies/";
    
    const player = "idahha@uia.no";
    const RIS_URL = "https://spacescavanger.onrender.com/"
    const spaceScavengerAnswerURL = `${RIS_URL}answer`;

    const startURL = `${RIS_URL}start?player=${player}`;
    const startResponse = await fetch(startURL);
    const dataStart= await startResponse.json();


    const corparationFetch = await fetch(corparationSystemURL);
    const coropdata = await corparationFetch.json();

    
    console.log(coropdata);
/*
    const names = [];

    corparationFetch.forEach(item => {
        names.push(item.coropdata.name);
        
    });

    console.log(names);

    for(let object of coropdata){
        console.log(object)
    }
*/
    console.log(dataStart);

    /*
    access pin is the difference between 
    the equatorial radius and the mean radius of the Sun. 
    Access the le-systeme-solaire system and find the pin."
    */

    const solData = await retriveSolarData("soleil");
    const solMeanRadius = solData.meanRadius;
    const solEquaRadius = solData.equaRadius;
    const radiusDiff = solEquaRadius - solMeanRadius;

    console.log(radiusDiff);

    await answerSpesificQuestion(`The pin is: ${radiusDiff}`, radiusDiff);


    async function retriveSolarData(bodyID){
        const planetDataURL = `${corparationSystemURL}${bodyID}`;
        console.log(planetDataURL)
        let response = await fetch(planetDataURL);
        const planet = await response.json();
        
        return planet;
    }

    async function answerSpesificQuestion(description, solution) {
        console.info(description)
        const answer = { answer: solution, player: player };
        await postAnswer(spaceScavengerAnswerURL, answer);
        //console.log(response)
    }

    async function postAnswer(url, answer) {
    
        const request = {
            method: "POST",
            body: JSON.stringify(answer),
            headers: {
                "Content-Type": "application/json",
            }
        };
    
        let respons = await fetch(url, request);
        respons = await respons.json();
        console.log(respons);
    }