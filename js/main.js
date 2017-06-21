//generate HandleBarTemplate
let compiled_template;

//Laden von Handlerbars zur Darstellung von Notizen
window.onload = function() {
    let template = document.getElementById('template').innerHTML;
    compiled_template = Handlebars.compile(template);
    let html = JSON.parse(localStorage.getItem('Notes'));
    document.getElementById('noteslist').innerHTML = compiled_template(html);
}
//HandleBar-Helpers: Eintrag Titel
Handlebars.registerHelper('formatTitle', function(title) {
    return "<b>" + title + "</b>";
});
//HandleBar-Helpers: Eintrag EditorButton
Handlebars.registerHelper('edit_button', function() {
    return "<button  class='buttonNotesList' onclick='notesApp.editNote(" + this.editor + ")'>Notiz editieren</button>";
});
//HandleBar-Helpers: Eintrag EditorButton
Handlebars.registerHelper('textarea-content', function() {
    return "<textarea class='textAreaNotesList'>"+ this.content + "</textarea>";
});
//HandleBar-Helpers: Rating verifizieren
Handlebars.registerHelper('count-importance', function() {
    let fieldSet = '';
    let html1= "<fieldset class='importanceNotesList'><input type='radio' id='imp5'><label for='imp5'></label></fieldset>";
    let html2='', html3='',html4='',html5=''
    switch(this.importance){
        case '1':
            return html1;
            break;
        case '2':
            return html2 = html1 + '<input type="radio" id="imp4"><label for="imp4"></label>';
            break;
        case '3':
            return html3 = html1 + html2 + '<input type="radio" id="imp3"><label for="imp3"></label>';
            break;
        case '4':
            return html4 = html1 + html2 + html3 + '<input type="radio" id="imp2"><label for="imp2"></label>';
            break;
        case '5':
            return html5 = html1 + html2 + html3 + html4 + '<input type="radio" id="imp1"><label for="imp1"></label>';
            break;
    }
});
Handlebars.registerHelper('checked-area', function() {
    let check = this.checked.toString();
    if (check == 'false') {
        return "<input type='checkbox' id='checkboxNotes' class='checkboxNotesList'" +
            "unchecked value='" + this.notesnr + "'onclick='notesApp.checkEndBoxSetDate(this)'>" +
            "<label for='checkboxNotes'></label>";
    }
    else {
        return "<input type='checkbox' id='checkboxNotes' class='checkboxNotesList' checked disabled>" +
            "<label for='checkboxNotes'>" + this.checked_date + "</label>";
    }
});

//change backgroundcolor
let notesApp = {

    function1: function ($this) {

    },

    changeBackGround:  function (valueOfChangeColor) {
        const nameOfTag = ['header', 'footer', 'article', 'aside', 'select'];
        const nameOfId = ['uebersicht', 'neuenotes','sortimportance','sortplanedfinished','sortcreate','sortfinished'];
        let elementsOfClassName = document.getElementsByClassName('buttonNotesList');
        const bgColorGW = '#DDDDDD';
        const ColorGW = '#b6b6b6';
        const bgColor = 'white';
        const Color = 'black';

        if (valueOfChangeColor === 'gw') {
            document.body.style.backgroundColor = bgColor;

            nameOfTag.forEach(function (item) {
                document.getElementsByTagName(item)[0].style.backgroundColor = bgColorGW;
                if (item ===
                    'select') {
                    document.getElementsByTagName(item)[0].style.color = Color;
                    document.getElementsByTagName(item)[0].style.backgroundColor = ColorGW;
                }
            });
            nameOfId.forEach(function (item) {
                document.getElementById(item).style.backgroundColor = ColorGW;
                document.getElementById(item).style.color = Color;
            });

            [].forEach.call(elementsOfClassName, function (item) {
                item.style.backgroundColor = ColorGW;
                item.style.color = Color;
            });
        }
        else {
                document.body.style.backgroundColor = Color;
                nameOfTag.forEach(function (item) {
                    document.getElementsByTagName(item)[0].style.backgroundColor = bgColor;
                    if (item ===
                        'select') {
                        document.getElementsByTagName(item)[0].style.color = bgColor;
                        document.getElementsByTagName(item)[0].style.backgroundColor = Color;
                    }
                });
                nameOfId.forEach(function (item) {
                    document.getElementById(item).style.backgroundColor = Color;
                    document.getElementById(item).style.color = bgColor;
                });
                [].forEach.call(elementsOfClassName, function (item) {
                    item.style.backgroundColor = Color;
                    item.style.color = bgColor;
                });
        }
    },

    checkEndBoxSetDate:function (valueOfTimeStamp) {
        [document.querySelectorAll('label')].forEach(function (item,
                                                               index) {
            if ((item)[index].previousSibling.value
            == valueOfTimeStamp.value) {
                let dateTime = new Date();
                (item)[index].innerHTML = dateTime.toLocaleDateString();
                valueOfTimeStamp.disabled = true;
            }
        });
        notesApp.updateFinishedNote(valueOfTimeStamp.value);
    },

    updateFinishedNote:function (valueOfTimeStamp) {

        let jsponobject = JSON.parse(localStorage.getItem('Notes'));
        let dat = new Date();

        jsponobject.forEach(function (item) {
            if (item.checked == false &&
                item.notesnr == valueOfTimeStamp) {
                    item.checked = 'true';
                    item.checked_date = dat.toLocaleDateString();
            }
        });
        localStorage.setItem("Notes", JSON.stringify(jsponobject));
    },

    editNote:function (valueOfItem) {
        localStorage.setItem('editNotes', valueOfItem);
        window.close('index.html');
        window.open('createNote.html');
    },

    sortNotes:function (kindOfSort) {
        switch (kindOfSort.value) {
            case 'Nach Wichtigkeit':

                 document.getElementById(kindOfSort.id).backgroundColor = 'white';

                if (document.getElementById('sortplanedfinished').style.backgroundColor == 'white') {
                        document.getElementById('sortplanedfinished').style.backgroundColor = '#b6b6b6';
                    }
                if (document.getElementById('sortcreate').style.backgroundColor == 'white') {
                        document.getElementById('sortcreate').style.backgroundColor = '#b6b6b6';
                    }
                if (document.getElementById('sortfinished').style.backgroundColor == 'white') {
                        document.getElementById('sortfinished').style.backgroundColor = '#b6b6b6';
                    }
                notesApp.loadSortedNotes('importance');
                break;
            case 'Nach Enddatum':
                document.getElementById(kindOfSort.id).style.backgroundColor = "white";
                if (document.getElementById('sortimportance').style.backgroundColor == "white") {
                        document.getElementById('sortimportance').style.backgroundColor = "#b6b6b6";
                    }
                if (document.getElementById('sortcreate').style.backgroundColor == "white") {
                        document.getElementById('sortcreate').style.backgroundColor = "#b6b6b6";
                    }
                if (document.getElementById('sortfinished').style.backgroundColor == "white") {
                        document.getElementById('sortfinished').style.backgroundColor = "#b6b6b6";
                    }
                notesApp.loadSortedNotes('finished');
                break;
            case 'Nach Erstellungs-Datum':
                document.getElementById(kindOfSort.id).style.backgroundColor = "white";
                if (document.getElementById('sortplanedfinished').style.backgroundColor == "white") {
                        document.getElementById('sortplanedfinished').style.backgroundColor = "#b6b6b6";
                    }
                if (document.getElementById('sortimportance').style.backgroundColor == "white") {
                        document.getElementById('sortimportance').style.backgroundColor = "#b6b6b6";
                    }
                if (document.getElementById('sortfinished').style.backgroundColor == "white") {
                        document.getElementById('sortfinished').style.backgroundColor = "#b6b6b6";
                    }
                notesApp.loadSortedNotes('createChangeDate')
                break;
            case 'Abgeschlossen':
                document.getElementById(kindOfSort.id).style.backgroundColor = "white";
                notesApp.filterFinishedNotes();
                break;
        }
    },

    filterFinishedNotes:function () {

        let jsonNotes = JSON.parse(localStorage.getItem('Notes'));

            function filterByCheckedFinished(jsonNotes){
                if('checked' in jsonNotes && typeof(jsonNotes.checked) && jsonNotes.checked == 'true') {
                    return true;
                }
            };

        let filteredArray = jsonNotes.filter(filterByCheckedFinished);

        if (localStorage.length !== 0 && (localStorage.getItem('Finished')!== null ||
            localStorage.getItem('Finished')== null)) {
            localStorage.removeItem('Finished');
            localStorage.setItem('Finished', JSON.stringify(filteredArray));
            let html = JSON.parse(localStorage.getItem('Finished'));
            document.getElementById('noteslist').innerHTML = self.compiled_template(html);
        }
    },

    loadSortedNotes:function (nameOfSorting) {
        let helper;
        let jsonobject = JSON.parse(localStorage.getItem('Notes'));
        let sortArray = [];

        for(let i in jsonobject) {
            sortArray.push(jsonobject[i]);
         }

        if (typeof helper == 'undefined') {
            helper = {};
        }

        helper.arr = {
            multisort: function (arr,
                                 columns,
                                 order_by) {
                function multisort_recursive(a,
                                             b,
                                             columns,
                                             order_by,
                                             index) {

                    let direction = order_by[index] == 'DESC' ? 1 : 0;
                    let is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);
                    let x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
                    x.toString().indexOf(',') > 0 ? x = notesApp.cleaningDate(x) : x = x;
                    let y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();
                    y.toString().indexOf(',') > 0 ? y = notesApp.cleaningDate(y) : y = y;
                    if (x < y) {
                        return direction == 0 ? -1 : 1;
                    }

                    if (x == y) {
                        return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
                    }

                    return direction == 0 ? 1 : -1;
                }
                return arr.sort(function (a,
                                          b) {
                    return multisort_recursive(a, b, columns, order_by, 0);
                });
            }
        };


        let notesImportance = helper.arr.multisort(
            sortArray, [nameOfSorting, 'notesnr'], ['DESC', 'ASC']);
        localStorage.setItem('Notes', JSON.stringify(notesImportance));
        location.reload();
    },

    cleaningDate:function(dateValue){
        dateValue = dateValue.replace(/[^0-9\.]+/g, "").split('.').reverse().join('.');
        return(new Date(dateValue)).getTime();
    }
};






