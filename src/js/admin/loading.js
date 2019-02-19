{
    let view = {
        el: '#siteLoading',
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }
    let controller = {
        init(view){
            this.view = view
            this.bindEventHup()
        },
        bindEventHup(){
            window.eventHup.on('beforeupload',()=>{
                this.view.show()
            })
            window.eventHup.on('afterupload',()=>{
                this.view.hide()
            })
        }
    }
    controller.init(view)
}