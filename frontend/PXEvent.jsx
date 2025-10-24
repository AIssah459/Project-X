class PXEvent{
    constructor(title, id, postedBy, img='') {
        this.id = id;
        this.title = title;
        this.postedBy = postedBy;
        this.img = img;
    }
}

export default PXEvent;