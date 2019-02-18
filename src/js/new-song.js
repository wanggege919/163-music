{
    let view = {
        el: '.page > aside > .newSong',
        template: `
             新建歌曲       
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }

    let model = {}

    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.active()
            window.eventHup.on('upload',(data)=>{
                this.active()
            })
            window.eventHup.on('select',(data)=>{
                this.deactive()
            })
            $(this.view.el).on('click',()=>{
                this.active()
            })
        },
        active(){
            $(this.view.el).addClass('active')
            window.eventHup.emit('new')
        },
        deactive(){
            $(this.view.el).removeClass('active')
        }
    }

    controller.init(view,model)

}