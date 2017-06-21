let countOfImportance = "0";

window.onload=function () {

    try {

        let saveButton = document.getElementById('save');
        let editID = localStorage.getItem('editNotes');
        if (editID === null) {
                saveButton.onclick = noteEdiApp.saveNewNotes;
        } else {
                noteEdiApp.loadContentForEditNotes(editID);
                saveButton.onclick = noteEdiApp.saveNotesEdited;
        }
    }
    catch (e) {
        alert('Keine Daten vorhanden!');
    }
}

let noteEdiApp={

    function1: function($this) {
    },

    loadContentForEditNotes:function (numberOfNotesToEdit) {
        let jsonNotes = JSON.parse(localStorage.getItem('Notes'));

        function filterToGetEditNotes(jsonNotes){
            if('notesnr' in jsonNotes && typeof(jsonNotes.notesnr) && jsonNotes.notesnr == numberOfNotesToEdit) {
                return true;
            }
        };

        let filteredArray = jsonNotes.filter(filterToGetEditNotes);

        let Number = class Number{
            constructor(daymonthyear) {
                this.daymonthyear = daymonthyear;
            }
            cleaning(){
                this.daymonthyear = this.daymonthyear.replace(/[^0-9\.]+/g, "").split('.').reverse().join('.');
                this.daymonthyear  = new Date(this.daymonthyear);
            }
            padDat(){
                let inputDate = this.daymonthyear.getFullYear() + "-";
                let month = this.daymonthyear.getMonth();
                month = month + 1;
                let day = this.daymonthyear.getDate();

                month.toString().length == 1 ? month = '0' + month : month = month;
                day.toString().length == 1 ? day = '0' + day : day = day;

                return inputDate + month + "-" + day;
            }
        };

        filteredArray.forEach(function (item) {
                    let title = document.getElementById('title');
                    title.value = item.title;
                    let content = document.getElementById('content');
                    content.innerHTML = item.content;
                    let inputDate = document.querySelector("input[type='date']");
                    let cleanDate = new Number(item.finished);
                    cleanDate.cleaning();
                    inputDate.value =  cleanDate.padDat();
                    let valueOfImportance = item.importance;
                    for (let i = 5; i >= valueOfImportance; i--) switch (i) {
                        case 5: {
                            document.getElementById("imp" + i).checked = true;
                            break;
                        }
                        case 4: {
                            document.getElementById("imp" + i).checked = true;
                            break;
                        }
                        case 3: {
                            document.getElementById("imp" + i).checked = true;
                            break;
                        }
                        case 2: {
                            document.getElementById("imp" + i).checked = true;
                            break;
                        }
                        case 1: {
                            document.getElementById("imp" + i).checked = true;
                            break;
                        }
                    }
        });

    },

    saveNotesEdited:function () {
        let jsonobject = JSON.parse(localStorage.getItem('Notes'));
        let itemNotesIdToEdit = localStorage.getItem('editNotes');

         jsonobject.forEach(function(item){

            if(item.notesnr==itemNotesIdToEdit) {
               item.title = document.getElementById('title').value;
               item.finished = noteEdiApp.getDateOfFinished(document.getElementById('finished').value,true);
               item.content = document.getElementById('content').value,
               item.importance = countOfImportance,
               item.checked='false';
               item.createChangeDate = new Intl.DateTimeFormat('de-DE').format(new Date()),
               item.checked_date='';
            }
         });

         localStorage.setItem('Notes', JSON.stringify(jsonobject));
         localStorage.removeItem('editNotes');

         window.close('createNote.html');
         window.open('index.html');
    },

    saveNewNotes: function () {
        let notes;

        if(noteEdiApp.validateNoteInputs()) {

            let stamp = new Date();
            let timeStamp = stamp.getTime();

            let Note = {};
            Note = {
                 notesnr: timeStamp,
                 title: document.getElementById('title').value,
                 finished: noteEdiApp.getDateOfFinished(document.getElementById('finished').value,false),
                 content: document.getElementById('content').value,
                 importance: countOfImportance,
                 checked: false,
                 createChangeDate: new Intl.DateTimeFormat("de-DE").format(new Date()),
                 editor: timeStamp,
                 checked_date: ''
            };

            if (localStorage.length !== 0) {
                notesFiltered = JSON.parse(localStorage.getItem('Notes'));
                notesFiltered.push(Note);
                localStorage.setItem('Notes', JSON.stringify(notesFiltered));
            } else {
                localStorage.setItem('Notes', "[]");
                notesFiltered = JSON.parse(localStorage.getItem('Notes'));
                notesFiltered.push(Note);
                localStorage.setItem('Notes', JSON.stringify(notesFiltered));
            }
        }

        window.close('createNote.html');
        window.open('index.html');
    },

    getDateOfFinished:function (valueOfInput, isEdit) {
        let timeArray = valueOfInput.split('-');
        if(isEdit) {
            timeArray[1]=parseInt(timeArray[1])-1;
            timeArray[1].toString().length == 1 ? timeArray[1]='0'+ timeArray[1]: timeArray[1]=timeArray[1];
        }
        let dayDate = new Intl.DateTimeFormat('de-DE', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'}).format(new Date(Date.UTC(timeArray[0], timeArray[1], timeArray[2])));
        return dayDate.replace(/\s+/g, '');
    },

    getImportance:function (valueOfCheckedImportance) {
       countOfImportance = valueOfCheckedImportance;
    },

    cancelSave: function () {
        window.close(this);
        window.open('index.html');
    },

    validateNoteInputs:function () {
        const nameOfIDs=['title','content','imp5','imp4','imp3','imp2','imp1','finished'];
        let counterOfRb = 0;

        nameOfIDs.forEach(function(item){
            let notesInput = document.getElementById(item);

            if(nameOfIDs.includes(notesInput.getAttribute ('id'))) if (notesInput.value == ''){
                alert('Bitte vollständig ausfüllen');
                return false;
            }
            else if (!notesInput.checked && notesInput.type == 'radio'){
                counterOfRb = counterOfRb + 1;
                if (counterOfRb == 5) {
                    alert('Bitte vollständig ausfüllen');
                    return false;
                }
            }
        });
        return true;
    },

    validateDate:function () {
        let selectedTime = new Date(document.getElementById('finished').value).getTime();
        let timeNow = new Date().getTime();

        if(selectedTime<=timeNow) {
            alert("Bitte wählen Sie ein Datum nach dem gewählten Datum!");
            let today = new Date();
            document.getElementById('finished').value = today.toISOString();
        };
    }
};