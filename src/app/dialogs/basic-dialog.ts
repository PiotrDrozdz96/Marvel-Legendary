export  abstract class BasicDialog {

    preview = '';

    mouseEnter(src) { this.preview = src; }
    mouseLeave() { this.preview = ''; }

}
