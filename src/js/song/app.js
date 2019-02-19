{
    let view = {
        el: '#app',
        template: `
            <audio src='{{url}}'></audio>
            <div>
                <button class='play'>播放</button>
                <button class='pause'>暂停</button>
            </div>
        `,
        render(data){
            $(this.el).html(this.template.replace('{{url}}',data.url))
        },
        play(){
            let audio = document.getElementsByTagName('audio')[0]
            audio.play()
        },
        pause(){
            let audio = document.getElementsByTagName('audio')[0]
            audio.pause()
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        setId(id){
            this.data.id = id
        },
        get(){
            var query = new AV.Query('Song');
            return query.get(this.data.id).then((song)=> {
                Object.assign(this.data,song.attributes)
                return song
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            let id = this.getSongId()
            this.model.setId(id)
            this.model.get().then(()=>{
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on('click','.play',()=>{
                this.view.play()
            })
            $(this.view.el).on('click','.pause',()=>{
                this.view.pause()
            })
        },
        getSongId() {
            let search = window.location.search
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }
            let array = search.split('&').filter((v => v))
            let id = ''
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }
            return id
        }
    }
    controller.init(view,model)
}





