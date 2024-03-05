# React101

Bu repo, [React.dev](https://react.dev/learn) "Learn React" sekmesi altında 4 başlıkta işlenen React eğitiminin **Türkçeleştirilmiş** ve **örneklendirilmiş** formunu içeren bir çalışmadır.

![Learn React](./public/assets/github-pic.png)

## İçerik
`src` klasörü içinde yer alan `App01.js`, `App02.js`, `App03.js`, `App04.js` dosyaları 4 başlığın ayrı ayrı kapsayıcı bileşenlerini temsil eder. Bu 4 başlık yine `src/components` klasörü içinde ayrı ayrı işlenmiş olup isimleri:

1. Describing the UI
2. Adding Interactivity
3. Managing State
4. Escape Hatches 

Örnekleri tarayıcı üzerinden, `src/index.js` Root.render() ifadesinin içine çalıştığınız başlığın numarasını `App{BaşlıkNumarası}` şeklinde geçip terminal üzerinden `npm start` başlatabilirsiniz. 

*Örneğin:*
#### src/index.js

```
root.render(
  <React.StrictMode>
    <App01 />  // Describing-the-UI componenti çalıştırılacaktır.
  </React.StrictMode>
)
```

**Yazar**[Samet Polat](https://www.linkedin.com/in/sametpolat17/)


