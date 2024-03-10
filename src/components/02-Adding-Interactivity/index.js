// Adding Interactivity

import { useState } from "react";

// Ekrandaki bazı şeyler kullanıcı girdisine yanıt olarak güncellenir. Örneğin, bir resim galerisine tıklamak aktif resmi değiştirir. React'te, zaman içinde değişen verilere state denir. Herhangi bir bileşene state ekleyebilir ve gerektiğinde güncelleyebilirsiniz. Bu bölümde, etkileşimleri işleyen, durumlarını güncelleyen ve zaman içinde farklı çıktılar görüntüleyen bileşenleri nasıl yazacağınızı öğreneceksiniz.

// 1. Responding to Events
// React, JSX'inize olay işleyicileri eklemenizi sağlar. Olay işleyicileri, tıklama, üzerine gelme, form girdilerine odaklanma gibi etkileşimlere yanıt olarak tetiklenecek kendi işlevlerinizdir.

export function Button01() {
    const handleClick = () => {
        alert('Hello. Its "Adding Interactivity" Page!');
    }
    return (
        <>
            <button onClick={handleClick}>See the messeage</button> 
            <button onClick={() => {
                alert('Hello. Im messeage2!');
            }}>See the Messeage2</button>
        </>
    )
}

// handleClick işlevini tanımladınız ve ardından bunu <button> öğesine bir prop olarak aktardınız. handleClick bir olay işleyicidir. Olay işleyici fonksiyonları:

// Genellikle bileşenlerinizin içinde tanımlanır.
// Adları handle ile başlar ve ardından olayın adı gelir.
// Geleneksel olarak, olay işleyicilerini handle ve ardından olay adı şeklinde adlandırmak yaygındır. Sıklıkla onClick={handleClick}, onMouseEnter={handleMouseEnter} ve benzerlerini görürsünüz.

// Not : Satır içi olay işleyicileri JSX içinde tanımlanan harici fonksiyonlar ile neredeyse aynıdır. Satır içi kısa işlevler için daha kullanışlıdır. Kullanılabilir.

// Olay işleyicilerine aktarılan işlevler çağrılmamalı, aktarılmalıdır.
// Aradaki fark çok ince. İlk örnekte handleClick fonksiyonu bir onClick olay işleyicisi olarak geçirilir. Bu, React'e onu hatırlamasını ve işlevinizi yalnızca kullanıcı düğmeye tıkladığında çağırmasını söyler. Aksi durumda handleClick() işlevinin sonundaki (), herhangi bir tıklama olmadan, oluşturma sırasında işlevi hemen çalıştırır. Bunun nedeni, JSX { some code } içindeki JavaScript'in hemen çalıştırılmasıdır.

// Olay işleyicilerindeki propları okuma
export function Toolbar() {
    return (
        <>
        <AlertButton messeage={"Playing..."}>
            Play Movie!
        </AlertButton>
        <AlertButton messeage={"Uploading..."}>
            Upload Movie!
        </AlertButton>
        </>
    )
}

function AlertButton({ messeage, children }) {
    const handleClick = () => {
        return alert(messeage);
    }
    return(
        <button onClick={handleClick}>
            {children}
        </button>
    )
}

// Olay işleyicilerini prop olarak geçme
function Button({onClick, children}) {
    return <button onClick={onClick}>{children}</button>
}

export function Aside() {
    const handleClickFollow = () => {
        return alert('Followed!')
    }
    const handleClickUnfollow = () => {
        return alert('Unfollowed!')
    }
    return (
        <aside>
        <Button onClick={handleClickFollow}>
            Follow!
        </Button>
        <Button onClick={handleClickUnfollow}>
            Unfollow!
        </Button>
        </aside>
    )
}


// <button> ve <div> gibi yerleşik bileşenler yalnızca "onClick" gibi tarayıcı olay adlarını destekler. Ancak, kendi bileşenlerinizi oluştururken, olay işleyici desteklerini istediğiniz şekilde adlandırabilirsiniz. Geleneksel olarak, olay işleyicisi propları on ile başlamalı ve ardından büyük harf gelmelidir. Örneğin, Button bileşeninin "onClick" prop'u "onSmash" olarak çağrılabilirdi.

// Event propagation (Olay Yayılımı)
// Olay işleyicileri, bileşeninizin sahip olabileceği tüm çocuklardan gelen olayları da yakalar. Bir olayın ağaçta "kabarcıklar oluşturduğunu" veya "yayıldığını" söyleriz: olayın gerçekleştiği yerden başlar ve sonra ağaçta yukarı doğru ilerler.

export function Bubbling() {
    return(
        <div onClick={() => alert('Parent Element')} style={{border:'1px solid red'}}>
            <button onClick={() => alert('Child1')}>Bubbling Button1!</button>
            <button onClick={() => alert('Child2')}>Bubbling Button2!</button>
        </div>
    )
}

// Herhangi bir düğmeye tıklarsanız, önce onun onClick'i, ardından da üst <div>'in onClick'i çalışacaktır. Böylece iki mesaj görünecektir. Araç çubuğunun kendisine tıklarsanız, yalnızca üst <div>'in onClick'i çalışır.

// Not : Yalnızca eklediğiniz JSX etiketinde çalışan onScroll hariç tüm olaylar React'te yayılır!

// Stopping propagation 
// Olay işleyicileri tek argüman olarak bir olay nesnesi alır. Geleneksel olarak, genellikle "event" anlamına gelen "e" olarak adlandırılır. Olayla ilgili bilgileri okumak için bu nesneyi kullanabilirsiniz.

// Bu olay nesnesi ayrıca yayılmayı durdurmanızı da sağlar. Bir olayın üst bileşenlere ulaşmasını önlemek istiyorsanız, bu Button bileşeninin yaptığı gibi e.stopPropagation() işlevini çağırmanız gerekir:
export function StopBubbling() {
    return (
        <div
        onClick={(e) => alert('Parent Button')}
        style={{border:'1px solid blue', marginTop:'1rem'}}
        >
        <Button onClick={(e) => {
            e.stopPropagation();
            return alert('Child1 Button');
        }}>
            No Bubbling Button1
        </Button>
        <Button onClick={(e) => {
            e.stopPropagation();
            return alert('Child2 Button')
        }}>
            No Bubbling Button2
        </Button>
        </div>
    )
}

// Bazı tarayıcı olaylarının kendileriyle ilişkili varsayılan davranışları vardır. Örneğin, içindeki bir düğmeye tıklandığında gerçekleşen bir <form> gönderme olayı, varsayılan olarak tüm sayfayı yeniden yükleyecektir. Ancak bunu preventDefault() yerleşik işlevi ile engelleyebiliriz:

export function Form() {
    return(
        <form onSubmit={(e) => {
            e.preventDefault();
            return alert('Submitting the form!')
        }}>
            <label htmlFor="userName">Username : </label>
            <input type="text" id="userName"/>
            <input type="submit" value={'Send!'}/>
        </form>
    )
}

// e.stopPropagation() ile e.preventDefault() işlevlerini karıştırmayın. İkisi de kullanışlıdır, ancak birbiriyle ilgisi yoktur:

// e.stopPropagation(), yukarıdaki etiketlere bağlı "olay işleyicilerinin kabarcıklanmasını" durdurur.
// e.preventDefault(), sahip olan birkaç olay için "varsayılan tarayıcı davranışını" engeller.

// Olay işleyicilerinin yan etkileri olabilir mi?
// Kesinlikle! Olay işleyicileri yan etkiler için en iyi yerdir. Render işlevlerinin aksine, event işleyicilerinin saf olması gerekmez, bu nedenle bir şeyi değiştirmek için harika bir yerdir - örneğin, yazmaya yanıt olarak bir girdinin değerini değiştirmek veya bir düğmeye basmaya yanıt olarak bir listeyi değiştirmek. Bununla birlikte, bazı bilgileri değiştirmek için önce onu saklamanın (state) bir yoluna ihtiyacınız vardır.


// 2. State. A Component's Memory

// Bileşenlerin genellikle bir etkileşim sonucunda ekrandakileri değiştirmesi gerekir. Forma bir şey yazmak giriş alanını güncellemeli, bir resim karuselinde "ileri" düğmesine tıklamak hangi resmin görüntüleneceğini değiştirmeli, "satın al" düğmesine tıklamak bir ürünü alışveriş sepetine koymalıdır. Bileşenlerin bazı şeyleri "hatırlaması" gerekir: mevcut girdi değeri, mevcut görsel, alışveriş sepeti. React'te bu tür bileşene özgü hafızaya state denir.

// Normal bir değişken bazen yeterli olmaz...
// İşte bir heykel görüntüsü oluşturan bir bileşen. "Next" düğmesine tıklandığında, indeksi 1'e, ardından 2'ye ve bu şekilde değiştirerek bir sonraki heykeli göstermelidir. Ancak, bu işe yaramayacaktır (deneyebilirsiniz!):

const sculptureList =  [{
        name: 'Homenaje a la Neurocirugía',
        artist: 'Marta Colvin Andrade',
        description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
        url: 'https://i.imgur.com/Mx7dA2Y.jpg',
        alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
      }, {
        name: 'Floralis Genérica',
        artist: 'Eduardo Catalano',
        description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
        url: 'https://i.imgur.com/ZF6s192m.jpg',
        alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
      }, {
        name: 'Eternal Presence',
        artist: 'John Woodrow Wilson',
        description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
        url: 'https://i.imgur.com/aTtVpES.jpg',
        alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
      }
]

export function FailedSculpture() {
    let index = 0;
    const sculptureIndex = () => {
        index += 1;
        console.log(index);
    }
    return(
        <div>
            <h2>
                {sculptureList[index].name}
                &nbsp;
                <i>{sculptureList[index].artist}</i>
            </h2>
            <img src={sculptureList[index].url} alt={sculptureList[index].alt}/>
            <p>{sculptureList[index].description}</p>
            <button onClick={sculptureIndex}>Next</button>
        </div>
    )
}

// handleClick olay işleyicisi yerel bir değişken olan index'i güncelliyor. Ancak iki şey bu değişikliğin görünmesini engelliyor:
// 1. Yerel değişkenler renderlar arasında kalıcı değildir. React bu bileşeni ikinci kez render ettiğinde, sıfırdan render eder; yerel değişkenlerdeki değişiklikleri dikkate almaz.
// 2*. Yerel değişkenlerdeki değişiklikler render işlemini tetiklemez. React, bileşeni yeni verilerle tekrar render etmesi gerektiğini fark etmez.

// Bir bileşeni yeni verilerle güncellemek için iki şeyin gerçekleşmesi gerekir:
// 1. Render'lar arasında verileri saklayın.
// 2. Bileşeni yeni verilerle render etmek için React'i tetikleme (yeniden render etme).

// useState Hook bu iki şeyi sağlar:
// 1. Verileri render'lar arasında tutmak için bir state değişkeni.
// 2. Değişkeni güncellemek ve React'in bileşeni tekrar render etmesini tetiklemek için bir state setter fonksiyonu.

export function SuccessSculpture() {
    const [index, setIndex] = useState(0) // Buradaki [ ve ] sözdizimine dizi yıkımı denir ve bir diziden değer okumanızı sağlar. useState tarafından döndürülen dizide her zaman tam olarak iki öğe bulunur.

    const [showMore, setShowMore] = useState(false);

    const handleClickIndex = () => {
        if(index === 2) {
            setIndex(0)
        }
        else {
            setIndex(index + 1)
        }
    }

    const handleClickShowMore = () => {
        setShowMore(!showMore);
    }
    return(
        <div>
            <h2>
                {sculptureList[index].name}
                &nbsp;
                <i>{sculptureList[index].artist}</i>
            </h2>
            <button onClick={handleClickShowMore}>{showMore ? 'Hide' : 'Show'} More!</button>
            {showMore && <span>{sculptureList[index].description}</span>}
            <br />
            <button onClick={handleClickIndex}>Next</button>
            <br />
            <img src={sculptureList[index].url} alt={sculptureList[index].alt}/>
        </div>
    )
}

// React'te useState ve "use" ile başlayan diğer tüm fonksiyonlar Hook olarak adlandırılır.

// Hook'lar (Kancalar), yalnızca React render alırken kullanılabilen özel fonksiyonlardır. Farklı React özelliklerine "bağlanmanızı" sağlarlar.

// Anatomy of useState
// useState'i çağırdığınızda, React'e bu bileşenin bir şeyi hatırlamasını istediğinizi söylemiş olursunuz:
// const [index, setIndex] = useState(0) gibi. Bu durumda, React'in index'i hatırlamasını istersiniz.

// Not : Bu çifti const [something, setSomething] gibi adlandırmak gelenekseldir. İstediğiniz herhangi bir isim verebilirsiniz, ancak kurallar projeler arasında işlerin daha kolay anlaşılmasını sağlar.

// useState için tek argüman, durum değişkeninizin başlangıç değeridir. Bu örnekte, indeksin ilk değeri useState(0) ile 0 olarak ayarlanmıştır.

// Bileşeniniz her işlendiğinde, useState size iki değer içeren bir dizi verir:

// 1. Sakladığınız değeri içeren durum değişkeni (index).
// 2. State değişkenini güncelleyebilen ve React'in bileşeni yeniden oluşturmasını tetikleyen state setter fonksiyonu (setIndex).

// == İşte bunun nasıl gerçekleştiği == :

// Bileşeniniz ilk kez oluşturulur. index için başlangıç değeri olarak useState'e 0 geçtiğiniz için [0, setIndex] değerini döndürecektir. React, 0'ın en son state değeri olduğunu hatırlar.

// Durumu güncellersiniz. Bir kullanıcı düğmeye tıkladığında, setIndex(index + 1) çağırır. index 0'dır, bu yüzden setIndex(1)'dir. setIndex, React'e index'in artık 1 olduğunu hatırlamasını söyler ve bu da bir render'ı tetikler.

// Bileşeninizin ikinci render'ı. React hala useState(0) değerini görür, ancak React index'i 1 olarak ayarladığınızı hatırladığı için bunun yerine [1, setIndex] değerini döndürür.

// Ve böyle devam eder!


// Bir bileşende istediğiniz kadar çok türde durum değişkenine sahip olabilirsiniz. Bu bileşenin iki durum değişkeni vardır: bir "index" ve  bir"showMore": Line 216


// State, ekrandaki bir bileşen örneği için yereldir. Başka bir deyişle, aynı bileşeni iki kez oluşturursanız, her bir kopya tamamen izole bir duruma sahip olacaktır! Birini değiştirmek diğerini etkilemeyecektir.

// Bu örnekte, daha önceki Galeri bileşeni, mantığında hiçbir değişiklik yapılmadan iki kez işlenmiştir. Galerilerin her birinin içindeki düğmelere tıklamayı deneyin. Durumlarının bağımsız olduğuna dikkat edin:

export function Gallery() {
    return (
        <>
        <Photo />
        <Photo />
        </>
    )
}

function Photo() {
    const [index, setIndex] = useState(0)
    return (
        <div>
        <img src={`https://picsum.photos/id/${index}/200/300`} alt="Example" />
        <button onClick={() => setIndex(index + 1)}>Next</button>
        </div>
    )
}

// Bu, durumu modülünüzün en üstünde bildirebileceğiniz normal değişkenlerden farklı kılan şeydir. Durum, belirli bir işlev çağrısına veya koddaki bir yere bağlı değildir, ancak ekrandaki belirli bir yere "yereldir". İki <Gallery /> bileşeni oluşturdunuz, bu nedenle durumları ayrı ayrı saklanır.

// Ayrıca, Sayfa bileşeninin Galeri durumu hakkında nasıl hiçbir şey "bilmediğine" ve hatta herhangi bir durumu olup olmadığına dikkat edin. Prop'ların aksine state, onu bildiren bileşene tamamen özeldir. Üst bileşen bunu değiştiremez. Bu, bileşenlerin geri kalanını etkilemeden herhangi bir bileşene durum eklemenize veya kaldırmanıza olanak tanır.

// Peki ya her iki galerinin de durumlarının senkronize olmasını istiyorsanız? React'te bunu yapmanın doğru yolu, state'i alt bileşenlerden kaldırmak ve en yakın paylaşılan ebeveynlerine eklemektir. (Bknz: components/03-Managing-State)


// State: A Component's Memory ÖZET: 
// Bir bileşenin render işlemleri arasında bazı bilgileri "hatırlaması" gerektiğinde bir durum değişkeni kullanın.
// Durum değişkenleri useState Hook'u çağrılarak bildirilir.
// Hook'lar use ile başlayan özel fonksiyonlardır. State gibi React özelliklerine "bağlanmanızı" sağlarlar.
// Hook'lar size import'ları hatırlatabilir: koşulsuz olarak çağrılmaları gerekir. Hook'ları çağırmak, useState de dahil olmak üzere, yalnızca bir bileşenin veya başka bir Hook'un en üst seviyesinde geçerlidir.
// useState Hook'u bir çift değer döndürür: geçerli durum ve bunu güncelleyecek işlev.
// Birden fazla state değişkeniniz olabilir. React dahili olarak bunları sıralarına göre eşleştirir.
// State bileşene özeldir. Eğer iki yerde render ederseniz, her kopya kendi state'ini alır.


// 3. Render And Commit
// Bileşenleriniz ekranda görüntülenmeden önce React tarafından işlenmelidir. Bu süreçteki adımları anlamak, kodunuzun nasıl çalıştığını düşünmenize ve davranışını açıklamanıza yardımcı olacaktır.

// Bileşenlerinizin mutfaktaki aşçılar olduğunu ve malzemelerden lezzetli yemekler hazırladığını düşünün. Bu senaryoda React, müşterilerden gelen istekleri yerine getiren ve onlara siparişlerini getiren garson konumundadır. Bu kullanıcı arayüzü talep etme ve servis etme sürecinin üç adımı vardır:

// 1. Triggering a render (Müşterinin siparişini mutfağa iletmek)
// 2. Rendering the component (Siparişin mutfakta hazırlanması)
// 3. Committing to the DOM (Siparişin müşteriye sunulması)

// 1. Triggering a Render:
// Bir bileşenin 2 durumda render edilir: 

// Bileşenin ilk render'ıdır.
// Bileşenin (veya atalarından birinin) durumu güncellenmiştir.

// İlk Render
// Uygulamanız başladığında, ilk render işlemini tetiklemeniz gerekir. Framework'ler ve sandbox'lar bazen bu kodu gizler, ancak hedef DOM düğümü ile createRoot'u çağırarak ve ardından bileşeninizle render yöntemini çağırarak yapılır:

// State Güncellendiğinde
// Bileşen başlangıçta render edildikten sonra, set fonksiyonuyla durumunu güncelleyerek daha fazla render işlemini tetikleyebilirsiniz. Bileşeninizin durumunu güncellemek otomatik olarak bir render kuyruğuna sokar. (Bunları, bir restoran müşterisinin ilk siparişini verdikten sonra susuzluk veya açlık durumuna bağlı olarak çay, tatlı ve her türlü şeyi sipariş etmesi gibi düşünebilirsiniz).


// 2. Rendering the component
// Bir render işlemini tetikledikten sonra React, ekranda neyin görüntüleneceğini bulmak için bileşenlerinizi çağırır. "Rendering" React'in bileşenlerinizi çağırmasıdır.

// İlk render işleminde React kök bileşeni çağıracaktır.
// Sonraki render'larda React, durum güncellemesi render'ı tetikleyen fonksiyon bileşenini çağırır.
// Bu süreç özyinelemelidir: güncellenen bileşen başka bir bileşen döndürürse, React bir sonraki bileşeni render eder ve bu bileşen de bir şey döndürürse, bir sonraki bileşeni render eder ve bu böyle devam eder. Bu süreç, iç içe geçmiş bileşen kalmayana ve React ekranda tam olarak neyin görüntülenmesi gerektiğini bilene kadar devam eder.

export function Gallery01() {
    return(
        <section>
            <h1>Gallery from LoremPicsum</h1>
            <img src="https://picsum.photos/id/237/200/300" alt="Deneme"/>
            <img src="https://picsum.photos/id/297/200/300" alt="Deneme"/>
            <img src="https://picsum.photos/id/217/200/300" alt="Deneme"/>
        </section>
    )
}

// İlk render sırasında React, <section>, <h1> ve üç <img> etiketi için DOM düğümlerini oluşturacaktır.
// Yeniden render sırasında React, varsa önceki render'dan bu yana hangi özelliklerinin değiştiğini hesaplayacaktır. Bir sonraki adım olan commit aşamasına kadar bu bilgilerle hiçbir şey yapmayacaktır.

        // Not : Render işlemi her zaman saf bir hesaplama olmalıdır:
            // Aynı girdiler, aynı çıktılar. Aynı girdiler verildiğinde, bir bileşen her zaman aynı JSX'i döndürmelidir. (Birisi domatesli bir salata sipariş ettiğinde, soğanlı bir salata almamalıdır!)
            // Kendi işine bakar. Oluşturmadan önce var olan hiçbir nesneyi veya değişkeni değiştirmemelidir. (Bir sipariş başka birinin siparişini değiştirmemelidir.)
            // Aksi takdirde, kod tabanınız karmaşıklaştıkça kafa karıştırıcı hatalar ve öngörülemeyen davranışlarla karşılaşabilirsiniz. "Strict Mode "da geliştirme yaparken, React her bileşenin fonksiyonunu iki kez çağırır, bu da saf olmayan fonksiyonların neden olduğu hataların ortaya çıkmasına yardımcı olabilir.


// 3. React commits changes to the DOM
// Bileşenlerinizi render ettikten (çağırdıktan) sonra React, DOM'u değiştirecektir.

// İlk render için React, oluşturduğu tüm DOM düğümlerini ekrana koymak için appendChild() DOM API'sini kullanacaktır.
// Yeniden render işlemlerinde React, DOM'un en son render çıktısıyla eşleşmesini sağlamak için gerekli minimum işlemleri (render sırasında hesaplanır!) uygular. React, DOM düğümlerini yalnızca renderlar arasında bir fark varsa değiştirir. 

// Sonsöz: Tarayıcı boyası
// Render işlemi tamamlandıktan ve React DOM'u güncelledikten sonra, tarayıcı ekranı yeniden boyayacaktır. Bu işlem "tarayıcı oluşturma (browser rendering) " olarak bilinse de, dokümanlar boyunca karışıklığı önlemek için "boyama (painting) " olarak adlandıracağız.

// Özet: 
// Bir React uygulamasındaki herhangi bir ekran güncellemesi üç adımda gerçekleşir:
// 1. Trigger
// 2. Render
// 3. Commit
// Render sonucu son seferle aynıysa React DOM'a dokunmaz.


// 4. State as a Snapshot
// Durum değişkenleri, okuyabileceğiniz ve yazabileceğiniz normal JavaScript değişkenleri gibi görünebilir. Ancak state daha çok bir anlık görüntü gibi davranır. Ayarlamak, halihazırda sahip olduğunuz durum değişkenini değiştirmez, bunun yerine yeniden oluşturmayı tetikler.

// "Rendering", React'in bir fonksiyon olan bileşeninizi çağırması anlamına gelir. Bu fonksiyondan döndürdüğünüz JSX, kullanıcı arayüzünün zaman içindeki anlık görüntüsü gibidir. Bileşenin prop'ları, olay işleyicileri ve yerel değişkenlerinin tümü, render sırasındaki durumu kullanılarak hesaplanmıştır.

// React bir bileşeni yeniden oluşturduğunda:

// React fonksiyonunuzu tekrar çağırır.
// Fonksiyonunuz yeni bir JSX anlık görüntüsü döndürür.
// React daha sonra ekranı, fonksiyonunuzun döndürdüğü anlık görüntüyle eşleşecek şekilde günceller.


// React bileşeninizi çağırdığında, size o belirli render için durumun anlık görüntüsünü verir. Bileşeniniz, JSX'inde olay işleyicisi ile kullanıcı arayüzünün bir anlık görüntüsünü döndürür ve bunların tümü o render'daki durum değerleri kullanılarak hesaplanır!

export function Counter() {
    const [number, setNumber] = useState(0);
    return (
        <div>
        <span>{number}</span>
        <button onClick={() => {
            setNumber(number + 1)
            setNumber(number + 1)
            setNumber(number + 1)
            console.log(number);
        }}>+3</button>
        </div>
    )
}

// === ! Durumu ayarlamak yalnızca "bir sonraki render için" durumu değiştirir ! ===
//  Bu nedenle, bu render işleminin onClick işleyicisinde setNumber(number + 1) çağrıldıktan sonra bile number değeri hala 0'dır.

// İşte bu düğmenin tıklama işleyicisinin React'e yapmasını söylediği şey:

// setNumber(sayı + 1): sayı 0 olduğu için setNumber(0 + 1).
// React bir sonraki render işleminde sayıyı 1 olarak değiştirmeye hazırlanır.

// setNumber(sayı + 1): sayı 0 olduğundan setNumber(0 + 1).
// React bir sonraki renderda sayıyı 1 olarak değiştirmeye hazırlanır.

// setNumber(sayı + 1): sayı 0 olduğundan setNumber(0 + 1).
// React bir sonraki render'da sayıyı 1 olarak değiştirmeye hazırlanır.

// setNumber(sayı + 1)'i üç kez çağırmış olsanız da, bu render'ın olay işleyicisinde sayı her zaman 0'dır, bu nedenle durumu üç kez 1 olarak ayarladınız. Bu nedenle, olay işleyiciniz bittikten sonra, React bileşeni 3 yerine 1'e eşit sayı ile yeniden işler.


// Bu eğlenceliydi. Bu düğmeye tıkladığınızda ne uyarı vereceğini tahmin etmeye çalışın:
export function Counter01() {
    const [number, setNumber] = useState(0)
    return(
        <div>
        <span>{number}</span>
        <button onClick={() => {
            setNumber(number + 5)
            setTimeout(() => {
                alert(number)
            }, 1000)
        }}>+5</button>
        </div>
    )
}

// React'te depolanan durum, uyarı çalıştığında değişmiş olabilir, ancak uyarı, kullanıcının onunla etkileşime girdiği andaki durumun anlık görüntüsü kullanılarak zamanlanmıştır!

// Bir durum değişkeninin değeri, olay işleyicisinin kodu zaman uyumsuz olsa bile bir render içinde asla değişmez. Bu render'ın onClick'i içinde, setNumber(number + 5) çağrıldıktan sonra bile number'ın değeri 0 olmaya devam eder. React bileşeninizi çağırarak kullanıcı arayüzünün "anlık görüntüsünü" aldığında değeri "sabitlenmiştir".

// İşte bunun olay işleyicilerinizi zamanlama hatalarına daha az eğilimli hale nasıl getirdiğine dair bir örnek. Aşağıda beş saniyelik gecikmeyle mesaj gönderen bir form bulunmaktadır. Bu senaryoyu hayal edin:

// "Gönder" düğmesine basarak Alice'e "Merhaba" gönderirsiniz.
// Beş saniyelik gecikme sona ermeden önce, "Kime" alanının değerini "Bob" olarak değiştiriyorsunuz.
// Uyarının ne göstermesini bekliyorsunuz? "Alice'e Merhaba dediniz" mi gösterecek? Yoksa "Bob'a Merhaba dediniz" mi görüntülenir? Bildiklerinize dayanarak bir tahmin yapın ve ardından deneyin:

export function Chatbox() {
    const [to, setTo] =  useState('Alice')
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            alert(`${message} to ${to}`)
        }, 3000)
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="to">To : </label>
                <select id="to" onChange={(e) => {
                    setTo(e.target.value)
                }}>
                    <option value={'Alice'}>Alice</option>
                    <option value={'Bob'}>Bob</option>
                </select>
                <br />
                <textarea
                placeholder="Message"
                value={message}
                onChange={handleChange}
                />
                <br />
                <input type="submit" value={'Send'}/>
            </form>
        </div>
    )
}

// React, state değerlerini bir render'ın olay işleyicileri içinde "sabit" tutar. Kod çalışırken durumun değişip değişmediği konusunda endişelenmenize gerek yoktur.

// Peki ya yeniden oluşturmadan önce en son durumu okumak isterseniz? Bir sonraki sayfada anlatılan durum güncelleyici işlevini kullanmak isteyeceksiniz!

// Özetle: 
// Durum ayarlama yeni bir render ister.
// React, state'i bileşeninizin dışında, sanki bir rafta saklıyormuş gibi saklar.
// useState'i çağırdığınızda, React size o render için state'in bir anlık görüntüsünü verir.
// Her render (ve içindeki fonksiyonlar) her zaman React'in o render'a verdiği state'in anlık görüntüsünü "görecektir".
// Geçmişte oluşturulan olay işleyicileri, oluşturuldukları render'daki state değerlerine sahiptir.



// 5. Queueing a Series of State Updates (Bir dizi state güncellemesini sıraya alma)
// Bir durum değişkeninin ayarlanması başka bir render işlemini kuyruğa alır. Ancak bazen bir sonraki render'ı kuyruğa almadan önce değer üzerinde birden fazla işlem gerçekleştirmek isteyebilirsiniz. Bunu yapmak için, React'in state güncellemelerini nasıl toplu hale getirdiğini anlamak yardımcı olur.

// Counter component'ını hatırlayalım: 
// export function Counter() {
//     const [number, setNumber] = useState(0);
//     return (
//         <div>
//         <span>{number}</span>
//         <button onClick={() => {
//             setNumber(number + 1)
//             setNumber(number + 1)
//             setNumber(number + 1)
//             console.log(number);
//         }}>+3</button>
//         </div>
//     )
// }

// 500 kere de çağırsak ilk çıktı her zaman 1 olacaktır. Çünkü number değişkeni her seferinde 0 dı.

// Ancak burada devreye giren başka bir faktör daha vardır. React, durum güncellemelerinizi işlemeden önce olay işleyicilerindeki tüm kodların çalışmasını bekler! Bu nedenle render işlemi yalnızca tüm bu setNumber() çağrılarından sonra gerçekleşir.

// Bu size restoranda sipariş alan bir garsonu hatırlatabilir. Bir garson ilk yemeğinizden bahsettiğinde mutfağa koşmaz! Bunun yerine, siparişinizi bitirmenize, üzerinde değişiklik yapmanıza ve hatta masadaki diğer kişilerin siparişlerini almanıza izin verirler.

// Bu, çok fazla yeniden oluşturmayı tetiklemeden birden fazla durum değişkenini (birden fazla bileşenden bile) güncellemenizi sağlar. Ancak bu aynı zamanda, olay işleyiciniz ve içindeki herhangi bir kod tamamlanana kadar kullanıcı arayüzünün güncellenmeyeceği anlamına da gelir. Batching olarak da bilinen bu davranış, React uygulamanızın çok daha hızlı çalışmasını sağlar.

// Eğer bir sonraki render işleminden önce aynı state değişkenini birden çok kez güncellemek istiyorsanız, setNumber(number + 1) gibi bir sonraki state değerini geçmek yerine, setNumber(n => n + 1) gibi kuyruktaki bir öncekine göre bir sonraki state'i hesaplayan bir fonksiyon geçebilirsiniz. Bu, React'in güncellemeleri en son durum değerine göre uygulamasını sağlar. Bu yaklaşım, her güncellemenin potansiyel olarak eski değerler yerine en son duruma dayandığını garanti ettiğinden, durumu hızlı bir şekilde art arda birden çok kez güncellemeniz gerektiğinde özellikle yararlıdır. Bu, beklenmedik davranışları önlemeye yardımcı olur ve uygulamanızın tutarlı bir durumda kalmasını sağlar. 

export function TripleCount() {
    const [number, setNumber] = useState(0)
    const handleClick = () => {
        setNumber(prev => prev + 1)
        setNumber(prev => prev + 1)
        setNumber(prev => prev + 1)
    }
    return (
        <div>
            <span><b>{number}</b></span>
            <button onClick={handleClick}>+3</button>
        </div>
    )
}

// İlk Render:
// TripleCounter bileşeni ilk oluşturulduğunda, useState kancası 0 başlangıç durum değeriyle çağrılır. Bu, sayı durum değişkenini 0 olarak başlatır.

// Düğme Tıklama Olay İşleyicisi:
// "+3" etiketli düğmeye tıklandığında, onClick olay işleyicisi tetiklenir.
// Olay işleyicinin içinde, setNumber öğesine art arda üç çağrı yapılır.

// Güncelleyici İşlevlerini Kuyruğa Alma:
// setNumber'a yapılan her çağrı bir güncelleme fonksiyonu alır (prev => prev + 1).
// React, durumu yeni değerle hemen güncellemek yerine, olay işleyicideki diğer tüm kodlar çalıştıktan sonra işlenmek üzere bu güncelleyici işlevleri sıraya koyar.

// Güncelleyici Fonksiyonları İşleme:
// Olay işleyicisi çalışmayı tamamladıktan sonra React, sıraya alınan güncelleyici işlevlerini işler.
// Bir sonraki render sırasında React, sıraya alınan güncelleyici işlevlerini sırayla gözden geçirir.

// Güncelleyici İşlevlerinin İşlenmesi (Devam):
// İlk güncelleyici fonksiyonu (n => n + 1) işlenir. Mevcut durum değeri 0'ı n olarak alır ve 0 + 1 = 1 döndürür.
// İkinci güncelleyici işlevi işlenir. Güncellenmiş durum değeri 1'i n olarak alır ve 1 + 1 = 2 döndürür.
// Üçüncü güncelleyici işlevi işlenir. Güncellenmiş durum değeri 2'yi n olarak alır ve 2 + 1 = 3 değerini döndürür.

// Durum Güncelleme:
// React, nihai sonucu (3) sayı değişkeni için güncellenmiş durum değeri olarak saklar.

// Güncellenmiş Durum ile yeniden oluşturma:
// React, Counter bileşenini güncellenmiş durum değeriyle (3) yeniden oluşturur.
// Sayı durum değişkenini görüntüleyen h1 öğesi artık güncellenmiş 3 değerini gösterir.


// Değiştirdikten sonra durumu güncellerseniz ne olur?
// Peki ya bu olay işleyicisi? Sizce bir sonraki renderda sayı ne olacak?
export function AnotherCount() {
    const [number, setNumber] = useState(0)
    const handleClick = () => {
        setNumber(number + 5)
        setNumber(prev => prev + 1)
    }
    return (
        <div>
            <span><b>{number}</b></span>
            <button onClick={handleClick}>Go Next!</button>
        </div>
    )
}

// İşte bu olay işleyicinin React'e yapmasını söylediği şey:

// setNumber(sayı + 5): sayı 0'dır, bu yüzden setNumber(0 + 5). React sıraya "5 ile değiştir" ekler.
// setNumber(n => n + 1): n => n + 1 bir güncelleme fonksiyonudur. React bu fonksiyonu sıraya ekler.
// Bir sonraki render sırasında React state sırayı gözden geçirir.

// Not : setState(5)'in aslında setState(n => 5) gibi çalıştığını fark etmiş olabilirsiniz, ancak n kullanılmaz!

// == Özet == 

// Bir güncelleyici işlevi (örneğin n => n + 1) kuyruğa eklenir.
// Başka herhangi bir değer (örneğin 5 sayısı) kuyruğa "5 ile değiştir" ekler ve zaten kuyruğa alınmış olanları yok sayar.
// Olay işleyici tamamlandıktan sonra, React bir yeniden oluşturmayı tetikleyecektir. Yeniden oluşturma sırasında React kuyruğu işleyecektir. Güncelleyici fonksiyonları render sırasında çalışır, bu nedenle güncelleyici fonksiyonları saf olmalı ve yalnızca sonucu döndürmelidir. İçlerinden state ayarlamaya çalışmayın veya başka yan etkiler çalıştırmayın. Strict Mode'da React, hataları bulmanıza yardımcı olmak için her güncelleyici fonksiyonu iki kez çalıştırır (ancak ikinci sonucu atar).

// Güncelleyici işlev argümanını ilgili durum değişkeninin ilk harfleriyle adlandırmak yaygındır:

// setEnabled(e => !e);
// setLastName(ln => ln.reverse());
// setFriendCount(fc => fc * 2);

// Daha ayrıntılı kod tercih ediyorsanız, diğer bir yaygın kural setEnabled(enabled => !enabled) gibi tam durum değişkeni adını tekrarlamak veya setEnabled(prevEnabled => !prevEnabled) gibi bir önek kullanmaktır.

// Kısaca...

// State'i ayarlamak, mevcut render'daki değişkeni değiştirmez, ancak yeni bir render talep eder.
// React, state güncellemelerini olay işleyicilerinin çalışması bittikten sonra işler. Buna batching denir.
// Bir olayda bazı durumları birden çok kez güncellemek için setNumber(n => n + 1) güncelleyici fonksiyonunu kullanabilirsiniz.


// 6. Updating Objects in State
// State, nesneler de dahil olmak üzere her türlü JavaScript değerini tutabilir. Ancak React state'te tuttuğunuz nesneleri doğrudan değiştirmemelisiniz. Bunun yerine, bir nesneyi güncellemek istediğinizde, yeni bir tane oluşturmanız (veya var olanın bir kopyasını oluşturmanız) ve ardından state'i bu kopyayı kullanacak şekilde ayarlamanız gerekir.

// Durumdaki Nesneleri Değiştirme: React state, nesneler de dahil olmak üzere çeşitli JavaScript değerlerini tutabilir. Ancak, state içinde saklanan nesneleri doğrudan değiştirmek önerilmez. Bir nesneyi güncellemek istediğinizde, yeni bir nesne oluşturmanız veya mevcut nesnenin bir kopyasını oluşturmanız ve ardından state'i bu kopyayı kullanacak şekilde ayarlamanız önerilir.

// Mutasyonu Anlamak: Mutasyon, bir nesnenin içeriğini doğrudan değiştirmek anlamına gelir. React state bağlamında, yeni bir nesne oluşturmadan veya bir kopya oluşturmadan bir nesneyi doğrudan değiştirirseniz, bu mutasyon olarak kabul edilir.

// Değişmez vs Değiştirilebilir: Sayılar, stringler ve booleanlar gibi değişmez değerler oluşturulduktan sonra değiştirilemez. Bunlara ancak yeni değerler atayabilirsinz, mevcut değerleri değiştiremezsiniz. Nesneler ise değiştirilebilir değerler olduğundan doğrudan değiştirilebilir:

// Primitive
// let num = 5; // num bir ilkel sayıdır
// console.log(num); // Çıktı: 5

// num = 10; // num öğesine yeni bir değer atama
// console.log(num); // Çıktı: 10

// // Complex
// let person = { ad: 'John', yaş: 30 }; // person bir nesnedir
// console.log(person); // Çıktı: { isim: 'John', yaş: 30 }

// person.age = 35; // person nesnesinin age özelliğinin değiştirilmesi
// console.log(person); // Çıktı: { isim: 'John', yaş: 35 }

// React state'teki nesneler teknik olarak değiştirilebilir olsa da, sayılar veya dizeler gibi değişmezmiş gibi davranmak en iyi uygulamadır. Nesneleri değiştirmek yerine, her zaman yeni nesneler oluşturmalı ve state'i bu yeni nesneleri kullanacak şekilde ayarlamalısınız:
export function MovingDot() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    const handlePointerMove = (e) => {
        // position.x = e.clientX; YANLIŞ
        // position.y = e.clientY; YANLIŞ

        setPosition({
            x: e.clientX,
            y: e.clientY
        })
    }

    return(
        <div
        onPointerMove={handlePointerMove}
        style={{
            width: '1680px',
            height: '480px',
            border: '2px solid blue',
            position: 'relative'
        }}>
            <div
            style={{
                position: 'absolute',
                left: '0',
                top: '0',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                backgroundColor: 'red',
                transform: `translate(${position.x}px, ${position.y}px)`
            }}>
            </div>
        </div>
    )
}

// Bu gibi kodlar, durumdaki mevcut bir nesneyi değiştirdiği için bir sorundur:
// position.x = e.clientX;
// position.y = e.clientY;

// Ancak bunun gibi kodlarda kesinlikle sorun yoktur çünkü yeni oluşturduğunuz bir nesneyi değiştiriyorsunuz:
// const nextPosition = {};
// nextPosition.x = e.clientX;
// nextPosition.y = e.clientY;
// setPosition(nextPosition);

// Aslında, bunu yazmak tamamen eşdeğerdir:
// setPosition({
//   x: e.clientX,
//   y: e.clientY
// });

// Mutasyon yalnızca halihazırda var olan nesneleri değiştirdiğinizde sorun yaratır. Yeni oluşturduğunuz bir nesneyi mutasyona uğratmak sorun yaratmaz çünkü henüz başka hiçbir kod ona referans vermez. Bu nesneyi değiştirmek, ona bağlı olan bir şeyi yanlışlıkla etkilemeyecektir. Buna "yerel mutasyon" denir. Render sırasında bile yerel mutasyon yapabilirsiniz. Çok kullanışlı ve tamamen sorunsuz!


// Nesneleri spread sözdizimiyle kopyalama
// Önceki örnekte, konum nesnesi her zaman geçerli imleç konumundan yeni oluşturulur. Ancak genellikle, oluşturduğunuz yeni nesnenin bir parçası olarak mevcut verileri de dahil etmek istersiniz. Örneğin, bir formdaki yalnızca bir alanı güncellemek, ancak diğer tüm alanlar için önceki değerleri korumak isteyebilirsiniz.

export function Member() {
    const [person, setPerson] = useState({
        firstName: 'Samet',
        lastName: 'Polat',
        mail: 'xyz@react.dev'
    })

    const handleChangeName = (e) => {
        return setPerson({
            ...person, // Eğer önceki değerleri spread operatörü ile geçmesydik her change olayında person nesnesinin diğer propertleri (lastname, mail) sıfırlanacaktı!
            firstName: e.target.value
        })
    }
    const handleChangeLastName = (e) => {
        return setPerson({
            ...person,
            lastName: e.target.value
        })
    }
    const handleChangeMail = (e) => {
        return setPerson({
            ...person,
            mail: e.target.value
        })
    }
    return(
        <div>
            <form>
                <label>
                    Firstname : 
                    <input
                    value={person.firstName}
                    onChange={handleChangeName}/>
                </label>
                <label>
                    Lastname : 
                    <input
                    value={person.lastName}
                    onChange={handleChangeLastName}/>
                </label>
                <label>
                    Mail : 
                    <input
                    value={person.mail}
                    onChange={handleChangeMail}/>
                </label>
            </form>
            <div>
                <h2>Is that you?</h2>
                <span>{person.firstName}</span> &nbsp;
                <span>{person.lastName}</span> &nbsp;
                <span>{person.mail}</span>
            </div>
        </div>
    )
}

// Deep Dive :
// Üç farklı olay işleyici yerine tek bir olay işleyici de kullanabilirsiniz. 
// Yapmanız gereken 2 şey var. 

// 1. Inputlara nesne içindeki adlandırmalarına göre name attribute' u tanımlamak: 
        // <input onChange={handleClick} name={firstName} ..... <input onChange={handleClick} name={lastName} ..... <input onChange={handleClick} name={mail} gibi..

// 2. Tek bir olay işleyici ile işi bitirmek: 
        // const handleClick = (e) => {setPerson({...person, [e.target.name]: e.target.value})}

// Şimdi iç içe geçmiş bir objeyi güncellemeye çalışalım:
export function Picture() {
    const [item, setItem] = useState({
        itemName: "Alexandra's Horse",
        itemInfos: {
            name: 'Bukefalos',
            atTime: 'B.C 200',
            pic: 'https://picsum.photos/id/200/200/300'
        }
    })

    const handleChange = (e) => {
        return setItem({
            ...item,
            itemInfos: {
                ...item.itemInfos,
                [e.target.name]: e.target.value
            }
        })
    }

    return(
        <div>
            <hr />
            <br />
            <form>
                <label>
                    Picture Name : 
                    <input
                    value={item.itemName}
                    onChange={(e) => {
                       setItem({
                        ...item,
                        itemName: e.target.value
                       }) 
                    }}/>
                </label>
                <label>
                    Horse's Name : 
                    <input
                    value={item.itemInfos.name}
                    name="name"
                    onChange={handleChange}/>
                </label>
                <label>
                    At time : 
                    <input
                    value={item.itemInfos.atTime}
                    name="atTime"
                    onChange={handleChange}/>
                </label>
            </form>
            <div>
                <h2>{item.itemName}</h2>
                <p>{item.itemInfos.name} <i>{item.itemInfos.atTime}</i></p> 
                <img src={item.itemInfos.pic} alt="Bukefalos"/>
            </div>
        </div>
    )
}


// 7. Updating Arrays in State
// Diziler JavaScript'te değiştirilebilir, ancak bunları state'te depolarken değişmez olarak ele almalısınız. Tıpkı nesnelerde olduğu gibi, state'te saklanan bir diziyi güncellemek istediğinizde, yeni bir tane oluşturmanız (veya mevcut bir dizinin kopyasını oluşturmanız) ve ardından state'i yeni diziyi kullanacak şekilde ayarlamanız gerekir.

// JavaScript'te, diziler sadece başka bir nesne türüdür. Nesnelerde olduğu gibi, React state'teki dizileri salt okunur olarak ele almalısınız. Bu, arr[0] = 'bird' gibi bir dizi içindeki öğeleri yeniden atamamanız ve ayrıca push() ve pop() gibi diziyi değiştiren yöntemleri kullanmamanız gerektiği anlamına gelir.

// Bunun yerine, bir diziyi her güncellemek istediğinizde, durum ayarlama işlevinize yeni bir dizi aktarmak isteyeceksiniz. Bunu yapmak için, filter() ve map() gibi mutasyona uğramayan yöntemleri çağırarak durumunuzdaki orijinal diziden yeni bir dizi oluşturabilirsiniz. Ardından durumunuzu ortaya çıkan yeni diziye ayarlayabilirsiniz.

// İşte yaygın dizi işlemlerinin bir referans tablosu. React state içinde dizilerle uğraşırken, sol sütundaki yöntemlerden kaçınmanız ve bunun yerine sağ sütundaki yöntemleri tercih etmeniz gerekecektir:

// Ekleme yaparken        : push, unshift yerine        => concat, [...arr]
// Çıkartma yaparken      : pop, shift, splice yerine   => filter, slice
// Yer değiştirme yaparken: splice, arr[i] yerine       => map
// Sıralama yaparken      : direkt sort, reverse yerine => önce diziyi koplayayın!


// Ekleme ve Çıkarma

let nextId = 0;

export function Adding() {
    const [name, setName] = useState('')
    const [sculptures, setSculptures] = useState([])
    const handleAddClick = () => {
        setSculptures([
            ...sculptures,
            {
                id: nextId++,
                name: name
            }
        ])
    }
    const handleDiscardClick = (id) => {
        setSculptures(
            sculptures.filter((item) => {
                return item.id !== id
            })
        )
    }
    return(
        <div>
            <h1>Inspiring Sculptures</h1>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <label>Sculpture name : </label>
                <input
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <button onClick={handleAddClick}>Add</button>
            </form>
            <ol>
                {
                    sculptures.map((sculpture) => {
                        return <li key={sculpture.id}>
                            {sculpture.name}
                            <button onClick={() => handleDiscardClick(sculpture.id)}> {/* Arrow Function kullanmamızın sebebi, eğer direkt olarak istediğimiz id parametresi ile çağırsak ilk renderda click eventi gerçekleşmeden de fonksiyon çağırılacaktı. Bunu engelledik. */}
                                Discard!
                            </button>
                            </li>
                    })
                }
            </ol>
        </div>
    )
}

// Transforming 
// Dizinin bazı öğelerini veya tümünü değiştirmek isterseniz, yeni bir dizi oluşturmak için map() işlevini kullanabilirsiniz. map'e aktaracağınız fonksiyon, verisine veya indeksine (veya her ikisine) bağlı olarak her bir öğeyle ne yapılacağına karar verebilir.

export function Transforming() {
    const initialShapes = [
        {id: 0, type: 'square', x: 100, y: 100},
        {id: 1, type: 'circle', x: 150, y: 100},
        {id: 2, type: 'square', x: 200, y: 100}
    ]
    const [shapes, setShapes] = useState(initialShapes);

    const handleClick = () => {
        const newShapes = shapes.map((shape) => { // if deyimi kullanmak için setter fonksiyonu ayrı çağıracağız. Bildğiniz üzere setter fonksiyonları koşullara bağlı olamaz.
            if(shape.type === 'circle'){
                return shape
            }
            else{
                return {
                    ...shape, // Ana obje nested yapıda olmadığı için sığ kopyalayabilirim.
                    y: shape.y + 50
                }
            }
        })
        setShapes(newShapes)
    }
    return (
        <div style={{position: 'relative'}}>
            {
                shapes.map((shape) => {
                    return <span
                        key={shape.id}
                        style={{
                            backgroundColor: 'orange',
                            position: 'absolute',
                            width: '30px',
                            height: '30px',
                            top: shape.y,
                            left: shape.x,
                            borderRadius: shape.type === 'circle' ? '50%' : ''
                        }}
                    ></span>
                })
            }
            <button onClick={handleClick}>
                Change Position!
            </button>
        </div>
    )
}

// Replacing 
// Bir dizideki bir veya daha fazla öğeyi değiştirmek istemek özellikle yaygındır. arr[0] = 'bird' gibi atamalar orijinal diziyi değiştirir, bu nedenle bunun için de map kullanmak isteyeceksiniz.

// Bir öğeyi değiştirmek için map ile yeni bir dizi oluşturun. map çağrınızın içinde, ikinci bağımsız değişken olarak öğe dizinini alırsınız. Orijinal öğeyi (ilk argüman) mi yoksa başka bir şeyi mi döndüreceğinize karar vermek için bunu kullanın:

export function Counters() {
    const initialCounters = [0, 0, 0];
    const [counters, setCounters] = useState(initialCounters);
    const handleClick = (index) => {
        const newCounters = counters.map((counter, i) => {
            if(i === index) {
                return counter + 1
            }
            else {
                return counter;
            }
        })
        setCounters(newCounters)
    }
    return(
        <>
        <br />
        <br />
        <br />
        <div>
            <ul>
                {counters.map((counter,i) => {
                    return (
                        <li key={i}>{counter}
                        <button onClick={() => handleClick(i)}>+1</button>
                        </li>
                    )
                })}
            </ul>
        </div>
        </>
    )
}

// Dizide başka değişiklikler yapma
// Yalnızca spread sözdizimi ve map() ve filter() gibi mutasyona uğramayan yöntemlerle yapamayacağınız bazı şeyler vardır. Örneğin, bir diziyi tersine çevirmek veya sıralamak isteyebilirsiniz. JavaScript reverse() ve sort() yöntemleri orijinal diziyi değiştirir, bu nedenle bunları doğrudan kullanamazsınız.

// Ancak, önce diziyi kopyalayabilir ve daha sonra üzerinde değişiklik yapabilirsiniz.

export function Sorting() {
    const [numbers, setNumbers] = useState([
        9, 7, 15, 8, 3, 21, 56
    ]);
    const [isSorted, setIsSorted] = useState(false);
    const handleClick = () => {
        const newNumbers = [...numbers];
        if(isSorted) {
            newNumbers.sort((a, b) => b - a);
            setIsSorted(false)
        }
        else{
            newNumbers.sort((a, b) => a - b);
            setIsSorted(true)
        }
        setNumbers(newNumbers)
    }
    return(
        <div>
            <ul>
                {
                    numbers.map((number) => {
                        return <li key={number}>{number}</li>
                    })
                }
            </ul>
            <button onClick={handleClick}>{isSorted ? 'High to low' : 'Low to high'}</button>
        </div>
    )
}

// Burada, önce orijinal dizinin bir kopyasını oluşturmak için [...numbers] yayma sözdizimini kullanırsınız. Artık bir kopyanız olduğuna göre, newNumbers.reverse() veya newNumbers.sort() gibi mutasyon yöntemlerini kullanabilir, hatta newNumbers[0] = "something" ile tek tek öğeler atayabilirsiniz.

// Ancak, bir diziyi spread operatörü ile kopyalasanız bile ve içindeki elemanlar nested (ve nesne!) ise bu öğeleri doğrudan değiştiremezsiniz! Bunun nedeni kopyalamanın sığ olmasıdır (shallow copy). Programlamada, sığ kopyalama, iç içe geçmiş tüm nesneleri özyinelemeli olarak kopyalamak yerine, bir nesnenin yalnızca doğrudan özelliklerinin kopyalandığı bir kopyalama türüdür. Bu, üst düzey yapı kopyalanırken, orijinal nesne içindeki tüm iç içe geçmiş nesnelerin kopyalanan nesnede hala referans alındığı anlamına gelir.Bu nedenle, dizinin elemanları nesneler veya diziler ise, bu elemanların değiştirilmesi hem orijinal diziyi hem de kopyalanan diziyi etkileyecektir. Dolayısıyla, kopyalanan dizinin içindeki bir nesneyi değiştirirseniz, mevcut durumu değiştirmiş olursunuz.

const originalArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
const copiedArray = [...originalArray];

copiedArray[0].id = 100;

console.log(originalArray); // Output: [{ id: 100 }, { id: 2 }, { id: 3 }]
console.log(copiedArray);   // Output: [{ id: 100 }, { id: 2 }, { id: 3 }]

// originalArray ve copiedArray iki farklı dizi olmasına rağmen, originalArray[0] ve copiedArray[0] aynı nesneye işaret eder. Dolayısıyla copiedArray[0].id öğesini değiştirdiğinizde, originalArray[0].id öğesini de değiştirmiş olursunuz. Bu, kaçınmanız gereken bir durum mutasyonudur! Bu sorunu, iç içe geçmiş JavaScript nesnelerini güncellemeye (map) benzer bir şekilde çözebilirsiniz; değiştirmek istediğiniz öğeleri mutasyona uğratmak yerine tek tek kopyalayarak.

// Updating objects inside arrays
// React state'te diziler içindeki nesneleri güncellemek, dinamik verilerle çalışırken yaygın bir görevdir. Bu senaryo genellikle state'inizde bir dizi nesne olduğunda ve dizi içindeki belirli bir nesneyi veya bu nesnenin özelliklerini "güncellemeniz" gerektiğinde ortaya çıkar.

// Nesneler gerçekte dizilerin "içinde" yer almazlar. Kodda "içinde" gibi görünebilirler, ancak bir dizideki her nesne, dizinin "işaret ettiği" ayrı bir değerdir. Bu nedenle iç içe geçmiş alanları değiştirirken dikkatli olmanız gerekir. Başka bir kişinin sanat eseri listesi dizinin aynı elemanına işaret edebilir!

// İç içe geçmiş durumu güncellerken, güncellemek istediğiniz noktadan en üst seviyeye kadar kopyalar oluşturmanız gerekir. Bunun nasıl çalıştığını görelim.

// Bu örnekte, iki ayrı sanat eseri listesi aynı başlangıç durumuna sahiptir. İzole olmaları gerekiyordu, ancak bir mutasyon nedeniyle durumları yanlışlıkla paylaşıldı ve bir listedeki bir kutunun işaretlenmesi diğer listeyi etkiledi:

export function BucketList(){
    const initialList = [
        { id: 0, title: 'Big Bellies', seen: false },
        { id: 1, title: 'Lunar Landscape', seen: false },
        { id: 2, title: 'Terracotta Army', seen: true }
    ];
    const [myList, setMyList] = useState(initialList);
    const [claraList, setClaraList] = useState(initialList);

    const handleMyList = (targetId, targetBool) => {
        setMyList((prevList) => {
            return(
                prevList.map((item) => {
                    if(item.id === targetId) {
                        return {
                            ...item,
                            seen: targetBool
                        }
                    }
                    else{
                        return item
                    }
                })
            )
        })
    }

    const handleClaraList = (targetId, targetBool) => {
        setClaraList((prevList) => {
            return(
                prevList.map((item) => {
                    if(item.id === targetId) {
                        return {
                            ...item,
                            seen: targetBool
                        }
                    }
                    else{
                        return item
                    }
                })
            )
        })
    }

    return(
        <>
        <h1>Bucket List</h1>
        <h2>My List</h2>
        <ItemList
            artworks={myList}
            onToggle={handleMyList}
        />
        <h2>Clara's List</h2>
        <ItemList
            artworks={claraList}
            onToggle={handleClaraList}
        />
        </>
    )
}

function ItemList({artworks, onToggle}) {
    return(
        <>
        <ul>
            {
                artworks.map((item) => {
                    return(
                        <li key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.seen}
                                onChange={(e) => onToggle(item.id, e.target.checked)}
                            />
                            {item.title}
                        </li>
                    )
                })
            }
        </ul>
        </>
    )
}

export function ShoppingCart() {
    const initialProducts = [{
        id: 0,
        name: 'Baklava',
        count: 1,
      }, {
        id: 1,
        name: 'Cheese',
        count: 5,
      }, {
        id: 2,
        name: 'Spaghetti',
        count: 2,
      }];
    const [products, setProducts] = useState(initialProducts)

    function handleIncreaseClick(productId) {
        setProducts(products.map(product => {
        if (product.id === productId) {
            return {
            ...product,
            count: product.count + 1
            };
        } else {
            return product;
        }
        }))
    }

    const handleDiscrementClick = (productId) => {
        const discrementArr = products.map((item) => {
            if(item.id === productId) {
                return {
                    ...item,
                    count: item.count - 1
                }
            }
            else{
                return item
            }
        })
        const discardArr = discrementArr.filter((item) => {
            return item.count !== 0
        })
        setProducts(discardArr)
    }

    return (
        <ul>
        {products.map(product => (
            <li key={product.id}>
            {product.name}
            {' '}
            (<b>{product.count}</b>)
            <button onClick={() => {
                handleIncreaseClick(product.id);
            }}>
                +
            </button>
            <button onClick={() => {handleDiscrementClick(product.id)}}>
                –
            </button>
            </li>
        ))}
        </ul>
    );
    }
