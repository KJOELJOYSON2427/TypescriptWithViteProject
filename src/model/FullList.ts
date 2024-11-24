import ListItem from './ListItem';

interface List{
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

type ParsedItem = {
    _id: string;
    _item: string;
    _checked: boolean;
};


export default class FullList implements List {
    private _list:ListItem[];

    static instance: FullList =new FullList();
    private constructor( list: ListItem[] = []){
             this._list=list;
    }

    get list():ListItem[]{
        return this._list;
    }
    
    load():void{
        const storedList: string | null = localStorage.getItem("mylist");
        if(typeof storedList!= "string"){
            return;
        }
        const parsedList: ParsedItem[]= JSON.parse(storedList);

        parsedList.forEach(itemobj=> {
            const newListItem = new ListItem(itemobj._id,itemobj._item,itemobj._checked);
        })

    }

    save():void{
        localStorage.setItem("mylist",JSON.stringify(this._list));
    }

    clearList(): void{
        this._list=[];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item=> item.id !==id);
        this.save();
    }
}