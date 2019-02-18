{
    let view = {
        el: '.page>main',
        template: `
        <h1>新建歌曲</h1>
        <form class="form">
            <div class="row">
                <label>
                    歌名
                    <input name="name" type="text" value="__name__">
                </label>

            </div>
            <div class="row">
                <label>
                    歌手
                    <input name="singer" type="text" value="__singer__">
                </label>
            </div>
            <div class="row">
                <label>
                    外链
                    <input name="url" type="text" value="__url__">
                </label>
            </div>
            <button type="submit">保存</button>
        </form>        
        `,
        render(data = {}) {//ES6 语法 如果用户没有传data或者data是undefined，则默认data是空对象
            let placeholders = ['name','singer','url','id']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })

            $(this.el).html(html)
        },
        reset(){
            this.render({})
        }
    }

    let model = {
        data: {
            name: '', singer: '', url: '', id: ''
        },
        create(data) {
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            // 设置优先级
            song.set('singer', data.singer);
            song.set('url', data.url);
            return song.save().then((newSong)=> {
                let {id, attributes} = newSong
                // this.data.id = id
                // this.data.name = attributes.name
                // this.data.singer = attributes.singer
                // this.data.url = attributes.url
                Object.assign(this.data,{ //把右边的对象值赋给左边对象，等同于上面
                    id,
                    ...attributes //等于下面三句，就是attributes的所有内容
                    // name: attributes.name,
                    // singer: attributes.singer,
                    // url: attributes.url
                    
                })
            }, (error)=> {
                console.error(error);
            });
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHup.on('upload', (data) => {
                this.reset(data)
            })
            window.eventHup.on('select',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
        },
        reset(data) {
            this.view.render(data)
        },
        bindEvents() {
            $(this.view.el).on('submit', 'form', (e) => {
                e.preventDefault()
                //let needs = ['name','singer','url']
                let needs = 'name singer url'.split(' ')//与上面一句效果一样
                let data = {}
                needs.map((string) => {
                    data[string] = $(this.view.el).find(`[name="${string}"]`).val()
                })
               
                this.model.create(data)
                .then(()=>{
                    this.view.reset()
                    //深拷贝
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHup.emit('create',object)
                })
            })
           
        }
    }

    controller.init(view, model)


}