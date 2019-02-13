// front-end
import Vue from 'vue';
import moment from 'moment-timezone'; // za vrijeme
moment.tz.setDefault("UTC+1"); // local time

new Vue({
    el: '#app',
    data: {
        naslov: 'Todo aplikacija',
        todos: [
            {id: 1, zadatak: 'Poslati pismo', opis: 'Napiši pismo TComu i pošalji ga', vrijeme: moment().format('DD-MM-YYYY HH:mm:ss')},
            {id: 2, zadatak: 'Kupiti povrće', opis: 'Otiđi na Dolac i kupi ok rajčice, salatu i brokoli', vrijeme: moment().format('DD-MM-YYYY HH:mm:ss')},
            {id: 3, zadatak: 'Dogradi PC', opis: 'Dodaj ispravnu ok memoriju na PC-u', vrijeme: moment().format('DD-MM-YYYY HH:mm:ss')}
        ],
        todosTemp: [],  // temp holder za todos, vraća početni sadržaj todos arraya nakon što search filtrira isti
        zadatakId: null,  // tri polja za unos pretrage zadataka
        zadatakIme: null,
        zadatakOpis: null,
        imeZadatka: null,  // ime novog zadatka u modalu
        opisZadatka: null,  // opis novog zadatka u modalu
        ajdi: 3  // početno stanje Id countera (tri probna unosa u todos array)
    },
    methods: {
        noviTodo: function() {  // unos novog zadatka u modalu
            
            this.ajdi += 1; // povećaj counter za Id
            if (this.imeZadatka === null) {this.imeZadatka = '';}  // ako nije upisao polje da ne javlja grešku
            if (this.opisZadatka === null) {this.opisZadatka = '';}

            this.todos.push({id: this.ajdi, zadatak: this.imeZadatka, opis: this.opisZadatka, vrijeme: moment().format('DD-MM-YYYY HH:mm:ss')});
            this.todosTemp = this.todos;  // stavi novi sadržaj todos u temp array todosTemp, jer search privremeno mijenja sadržaj todos
            this.imeZadatka = null;
            this.opisZadatka = null;
        },
        zatvori: function() {   // isprazni input polja kod zatvaranja modala bez sejvanja
            this.imeZadatka = null;   // Napomena: nije implementirano ako klikne X da zatvori
            this.opisZadatka = null;
        },
        obrisiItem: function(item) {
            for (var x = 0; x < this.todos.length; x++) {
                if (this.todos[x].id === item.id) // ako je poslani id jednak id-u u todos arrayu..
                this.todos.splice(x, 1);  // obriši taj unos iz todos arraya
            }
            this.todosTemp = this.todos;  // spremi novo stanje u temp todos, da može resetirati prikaz nakon searcha
        },
        sortajId: function() {  // klikom na 'Id' poziva sortanje po key-u 'Id'
            function comp(a, b) {  // funkcija koja vrši sortanje
                const prvi = a.id; 
                const drugi = b.id;
                
                let compare = 0;
                if (prvi > drugi) {
                    compare = 1;
                } else if (prvi < drugi) {
                    compare = -1;
                }
                return compare;
            }
            return this.todos.sort(comp); // sortaj    
        },
        sortajZadatak: function() {  // klikom na 'Zadatak' poziva sortanje po key-u 'zadatak'
            function comp(a, b) {  
                const prvi = a.zadatak; 
                const drugi = b.zadatak;
                
                let compare = 0;
                if (prvi > drugi) {
                    compare = 1;
                } else if (prvi < drugi) {
                    compare = -1;
                }
                return compare;
            }
            return this.todos.sort(comp); // sortaj    
        },
        sortajOpis: function() {  // klikom na 'Opis' poziva sortanje po key-u 'opis'
            function comp(a, b) {  
                const prvi = a.opis; 
                const drugi = b.opis;
                
                let compare = 0;
                if (prvi > drugi) {
                    compare = 1;
                } else if (prvi < drugi) {
                    compare = -1;
                }
                return compare;
            }
            return this.todos.sort(comp); // sortaj    
        },
        sortajDatum: function() {  // klikom na 'Datum' poziva sortanje po key-u 'Ddatum'
            function comp(a, b) {  
                const prvi = a.vrijeme; 
                const drugi = b.vrijeme;
                
                let compare = 0;
                if (prvi > drugi) {
                    compare = 1;
                } else if (prvi < drugi) {
                    compare = -1;
                }
                return compare;
            }
            return this.todos.sort(comp); // sortaj    
        },
        traziPolja: function() {
            
            var self = this; // mora radi metode unutar metode u objectu
            function trazi() {
                var temp = [];
                for (let i = 0; i < self.todos.length; i++) {
                    
                    var valid = self.todos[i].zadatak;
                    var valid2 = self.todos[i].opis;
                    var valid3 = self.todos[i].id;
                    
                    // ako je našao riječ iz input polja u key value objecta u arrayu todos (pretvoreno u lower case) 
                    if (valid.toLowerCase().includes(self.zadatakIme)) {
                        temp.push(self.todos[i]);
                    } else if (valid2.toLowerCase().includes(self.zadatakOpis)) {
                        temp.push(self.todos[i]);
                    } else if (valid3.toString().includes(self.zadatakId)) { // valid3 je broj, zato treba toString()
                        temp.push(self.todos[i]);
                    }
                }
                if (temp.length > 0) { // ako je našao u bilo kojoj rubrici ubaci rezultat u array todos
                    self.todos = temp;
                }
            }
            trazi();
            // this.zadatakId, this.zadatakIme, this.zadatakOpis = null;  // isprazni input polja
        
        },
        resetiraj: function() {
            this.todos = this.todosTemp; // vrati početni sadržaj todos arraya nakon fintriranja istog
            this.zadatakId = null;  // isprazni polja za search
            this.zadatakIme = null;
            this.zadatakOpis = null;
        }
    },
    created: function() {
        this.todosTemp = this.todos; // spremi početni sadržaj todos arraya koji ćeš mijenjati search funkcijom
    }
});