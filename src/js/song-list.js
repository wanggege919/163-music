{
    let view = {
        el: '#songList-container',
        template: `
        <ul class="songList">   
        </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
            let { songs } = data
            let liList = songs.map((song) => {
                let li = $('<li></li>').text(song.name).attr('data-song-id',song.id)
                return li
            })
            $(this.el).find('ul').empty()
            liList.map((domLi) => {
                $(this.el).find('ul').append(domLi)
            })
        },
        activeItem(li){
            $(li).addClass('active').siblings('.active').removeClass('active')
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song')
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    return { id: song.id, ...song.attributes }
                })
                return songs
            })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            this.bindEventsHup()
            this.getAllSongs()

        },
        getAllSongs() {
            return this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        bindEvents() {
            $(this.view.el).on('click','li',(e)=>{
                this.view.activeItem(e.currentTarget)
                let songId = e.currentTarget.getAttribute('data-song-id')
                let songs = this.model.data.songs
                let data
                for(var i = 0;i<songs.length;i++){
                    if(songs[i].id === songId){
                        data = songs[i]
                        break
                    }
                }
                //深复制  使这个文件的data 不要与另一个文件有关联
                let string = JSON.stringify(data)
                let object = JSON.parse(string)
                window.eventHup.emit('select',object)
            }) 
        },
        bindEventsHup() {
            window.eventHup.on('upload', () => {
                this.view.clearActive()
            })
            window.eventHup.on('create', (songData) => {
                this.model.data.songs.push(songData)
                this.view.render(this.model.data)
            })
            
        }
    }

    controller.init(view, model)

}