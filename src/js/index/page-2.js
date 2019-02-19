{
    let view = {
        el: '.page-2',
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }

    let model = {

    }

    let controller = {
        init(view,model){
            this.view = view
            this.model= model
            this.bindEventHup()
        },
        bindEventHup(){
            window.eventHup.on('selectTap',(tapName)=>{
                if(tapName === 'page-2'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view,model)
}