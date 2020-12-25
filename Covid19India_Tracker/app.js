/**Api link assigning in variable 'api' */
let api = "https://api.covid19india.org/data.json";

/**Grabing necessary html elements by ID attribute */
let searchButton = document.getElementById('search-btn');
let inputField = document.getElementById('input');
let noDisplayTable = document.getElementById('displayTable');
let searchField = document.getElementById('input');
/**End of Grabing necessary html elements by ID attribute */

/** Empty Arrays for all the necessary data's to store from API */
let states = [];
let Active = [];
let Confirmed = [];
let Recovered = [];
let Death = [];
let MigrateToOther = [];
let ApiData =[];
/** End of Empty Arrays for all the necessary data's to store from API */

/**Specifying variables for storing data's. */
let total_active;
let total_confirmed;
let total_recovered;
let total_death;
let total_migratetoother;
/**End of Specifying variables for storing data's. */

/**Fetching API using fetch() method */
fetch(api)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        /**Total Cases in India */
        total_active =  data.statewise[0].active;     
        total_confirmed = data.statewise[0].confirmed;
        total_recovered = data.statewise[0].recovered;
        total_death = data.statewise[0].deaths;
        total_migratetoother = data.statewise[0].migratedother;
        
        document.getElementById('cases').innerHTML = total_confirmed;
        document.getElementById('active').innerHTML = total_active;
        document.getElementById('death').innerHTML = total_death;
        document.getElementById('recovered').innerHTML = total_recovered;
        
        /**End Of Total Cases in India */

        /**Iterating all the data from statewise object from the API in each empty array according to necessity */
        for( i =0 ; i<data.statewise.length; i++)
        {
            states.push(data.statewise[i].state);
            ApiData.push(data.statewise[i].state);
            Active.push(data.statewise[i].active);
            Confirmed.push(data.statewise[i].confirmed);
            Recovered .push(data.statewise[i].recovered);
            Death.push(data.statewise[i].deaths);
            MigrateToOther.push(data.statewise[i].migratedother);
        }
        /**End of Iterating all the data from statewise object from the API in each empty array according to necessity */
        
        /**Removing the first selement from each array i.e. unnecessary.*/
        states.shift();
        ApiData.shift();
        Active.shift();
        Confirmed.shift();
        Recovered.shift();
        Death.shift();
        MigrateToOther.shift();
        /**End of Removing the first selement from each array i.e. unnecessary.*/

        /**Enter button eventListener using 'keypress' event. */
        searchField.addEventListener('keypress', function(e){
            if( e.key === 'Enter'){
                for( s =0 ; s<data.statewise.length; s++)
                {   
                    data.statewise[s].state=data.statewise[s].state.toUpperCase();
                    inputField.value= inputField.value.toUpperCase();

                if(data.statewise[s].state && data.statewise[s].state === inputField.value){
                            document.getElementById('state').innerHTML= data.statewise[s].state;
                            document.getElementById('Active_cases').innerHTML= data.statewise[s].active;
                            document.getElementById('Confirm_cases').innerHTML= data.statewise[s].confirmed;
                            document.getElementById('Total_Deaths').innerHTML= data.statewise[s].deaths;
                            document.getElementById('Recovered_cases').innerHTML= data.statewise[s].recovered; 
                            inputField.value ="";
                            document.getElementById('input').focus();
                            displayTable();
                            break;   
                    }
                else if(inputField.value === ""){
                    
                    //alert('Please Enter a valid state name.');
                    //location.reload();
                    noDisplay();
                    document.getElementById('input').focus();
                    break;   
                }
                } 
            }
        });  
        /**End of Enter button eventListener using 'keypress' event. */

        /**Search button eventListener using 'click' event. */
        searchButton.addEventListener('click', function(){
            for( s =0 ; s<data.statewise.length; s++)
             {   
                        data.statewise[s].state=data.statewise[s].state.toUpperCase();
                        inputField.value= inputField.value.toUpperCase();

                
                    if( data.statewise[s].state === inputField.value){
                                document.getElementById('state').innerHTML= data.statewise[s].state;
                                document.getElementById('Active_cases').innerHTML= data.statewise[s].active;
                                document.getElementById('Confirm_cases').innerHTML= data.statewise[s].confirmed;
                                document.getElementById('Total_Deaths').innerHTML= data.statewise[s].deaths;
                                document.getElementById('Recovered_cases').innerHTML= data.statewise[s].recovered; 
                                inputField.value ="";
                                document.getElementById('input').focus();
                                break;   
                        }
                    else if(inputField.value === ""){
                        noDisplay();
                        //alert('Please Enter a valid state name.');
                        //location.reload(); 
                        document.getElementById('input').focus();
                        break;   
                    }
        } 
        });  
        /**End of Search button eventListener using 'click' event. */
    });
    /**End of Fetching API using fetch() method */

    /**noDisplay () function*/
    function noDisplay(){
        /**SweetAlert Box */
        swal("Please enter a valid state name.", "", "info");
        /**End of SweetAlert Box */
        document.getElementById('displayTable').style.display= "none";
    }
    /**End of noDisplay() function */

    /**Function to display the Hidden table after fetching the data*/
    function displayTable(){
        if(document.getElementById('displayTable').style.display= "none"){
            document.getElementById("displayTable").style.display="block";
            document.getElementById("state").style.paddingLeft="45px";
            document.getElementById("displayTable").style.width= "400px";
            document.getElementById("displayTable").style.height="200px";
            document.getElementById("displayTable").style.textAlign="center";
            document.getElementById("displayTable").style.marginLeft="auto";
            document.getElementById("displayTable").style.marginRight="auto";
            document.getElementById("displayTable").style.padding="25px 10px 25px 10px";
            document.getElementById("displayTable").style.fontSize="20px";
        }
    }
    /**End of Function to display the Hidden table after fetching the data*/