import { useRef, useState, forwardRef, useEffect } from "react";
import { flushSync } from "react-dom";

// 04 - Escape Hatches

// 1. Referencing Values with Refs
// Bir bileşenin bazı bilgileri "hatırlamasını" istediğinizde, ancak bu bilgilerin yeni render işlemlerini tetiklemesini istemediğinizde, bir ref kullanabilirsiniz.

// React'ten useRef Hook'unu içe aktararak bileşeninize bir ref ekleyebilirsiniz. Bileşeninizin içinde useRef Hook'unu çağırın ve referans vermek istediğiniz başlangıç değerini tek argüman olarak iletin. Örneğin, burada 0 değerine bir ref vardır:

export function Counter() {
    let ref = useRef(0)

    const handleClick = () => {
        ref.current += 1
        alert(`Clicked ${ref.current} times!`);
    }
    return (
        <>
            <h1>{ref.current}</h1>
            <button onClick={handleClick}>Click!</button>
        </>
    )
}

// Bu ref'in geçerli değerine ref.current özelliği aracılığıyla erişebilirsiniz. Bu değer kasıtlı olarak değiştirilebilir, yani hem okuyabilir hem de yazabilirsiniz. React'in takip etmediği, bileşeninizin gizli bir cebi gibidir. (Bu, onu React'in tek yönlü veri akışından bir "kaçış kapağı" yapan şeydir.

// ref bir sayıya işaret eder, ancak state gibi, herhangi bir şeye işaret edebilirsiniz: bir dize, bir nesne veya hatta bir fonksiyon. State'in aksine ref, okuyabileceğiniz ve değiştirebileceğiniz geçerli özelliğe sahip düz bir JavaScript nesnesidir.

// Bileşenin her artışta yeniden render edilmediğini unutmayın. State gibi, ref'ler de React tarafından yeniden oluşturma arasında korunur. Bununla birlikte, state'i ayarlamak bir bileşeni yeniden oluşturur. Ref değiştirmek bunu yapmaz!

// Example : Build a Stopwatch

export function Stopwatch() {
    const [startTime, setStartTime] = useState(null)
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null)

    let time = (now - startTime) / 1000;

    const handleStart = () => {
        setStartTime(Date.now());
        setNow(Date.now())
        intervalRef.current = setInterval(() => {
            setNow(Date.now())
        }, 1)
    }
    const handleStop = () => {
        return clearInterval(intervalRef.current)
    }
    return (
        <>
            <h1>Stopwatch</h1>
            <h2>{time}</h2>
            <button onClick={handleStart}>Start!</button>
            <button onClick={handleStop}>Stop!</button>
        </>
    )
}

// Bir bilgi parçası render için kullanıldığında, onu durumda tutun. Bir bilgi parçasına yalnızca olay işleyicileri tarafından ihtiyaç duyulduğunda ve değiştirilmesi yeniden render gerektirmediğinde, ref kullanmak daha verimli olabilir.

// Differences between refs and state 

// 1. useRef bir { current : something } nesnesi döndürür ancak useState [ something, setSomething ] formunda bir dizi döndürür.
// 2. useRef render'ı tetiklemez, useState tetikler.
// 3*. useRef doğrudan değiştirilebilir, useState değiştirilemez (setter fonksiyonuna ihtiyacı vardır.)

export function Difference() {
    const [click, setClick] = useState(0);
    const clikcRef = useRef(0);
    return (
        <>
            <div>
                <h1>With State</h1>
                <h2>You clicked {click} times.</h2>
                <button onClick={() => setClick(click + 1)}>Click!</button>
            </div>
            <div>
                <h1>With Ref</h1>
                <h2>You clicked {clikcRef.current} times.</h2>
                <button onClick={() => clikcRef.current += 1}>Click!</button>
            </div>
        </>
    )
}

// When to use refs 
// Tipik olarak, bileşeninizin React'in "dışına çıkması" ve harici API'lerle (genellikle bileşenin görünümünü etkilemeyecek bir tarayıcı API'si) iletişim kurması gerektiğinde bir ref kullanırsınız. İşte bu nadir durumlardan birkaçı:

// Zaman aşımı kimliklerinin saklanması
// Bir sonraki sayfada ele alacağımız DOM öğelerinin depolanması ve manipüle edilmesi
// JSX'i hesaplamak için gerekli olmayan diğer nesneleri saklama.
// Bileşeninizin bir değer depolaması gerekiyorsa, ancak bu değer oluşturma mantığını etkilemiyorsa, refs.

// Best practices for refs 
// Bu ilkelere uymak bileşenlerinizi daha öngörülebilir hale getirecektir:

// Ref'leri bir kaçış kapısı olarak değerlendirin. Ref'ler, harici sistemler veya tarayıcı API'leri ile çalışırken kullanışlıdır. Uygulama mantığınızın ve veri akışınızın çoğu ref'lere dayanıyorsa, yaklaşımınızı yeniden düşünmek isteyebilirsiniz.

// 'Render' sırasında ref.current dosyasını okumayın veya yazmayın. Render sırasında bazı bilgilere ihtiyaç duyulursa, bunun yerine state kullanın. React ref.current'in ne zaman değiştiğini bilmediğinden, render sırasında okunması bile bileşeninizin davranışının tahmin edilmesini zorlaştırır. (Bunun tek istisnası, if (!ref.current) ref.current = new Thing() gibi kodlardır, bu da ref'i yalnızca ilk render sırasında bir kez ayarlar).

// Ref'ler, özellikle öğelere odaklanma, boyutları ölçme veya üçüncü taraf kütüphanelerle entegrasyon gibi görevler için DOM düğümlerine veya React bileşen örneklerine erişmek için kullanışlıdır. Ancak, render işlemi sırasında ref.current'e doğrudan erişmek, React ref'in geçerli değerini henüz güncellememiş olabileceğinden öngörülemeyen davranışlara yol açabilir.

// Bunun yerine, ilk render işleminden sonra DOM veya bileşen örnekleriyle etkileşim kurmak için olay işleyicileri, yaşam döngüsü yöntemleri veya useEffect kancaları içindeki ref'leri kullanmalısınız. Bu, en güncel değerlerle çalışmanızı sağlar ve React'in render işlemiyle ilgili olası sorunları önler.

// Ayrıca bir ref ile çalışırken mutasyondan kaçınma konusunda endişelenmenize gerek yoktur. Mutasyona uğrattığınız nesne render için kullanılmadığı sürece, React ref veya içeriği ile ne yaptığınızı umursamaz.

// Refs and DOM
// Bir ref'yi herhangi bir değere yönlendirebilirsiniz. Bununla birlikte, ref için en yaygın kullanım durumu bir DOM öğesine erişmektir. Örneğin, bir girişi programlı olarak odaklamak istiyorsanız bu kullanışlıdır. JSX'teki bir ref niteliğine <div ref={myRef}> gibi bir ref ilettiğinizde, React ilgili DOM öğesini myRef.current içine koyacaktır. Eleman DOM'dan kaldırıldığında, React myRef.current dosyasını null olarak güncelleyecektir. Bu konuda daha fazla bilgi aşağıda işlenmiştir.

// ÖZET 
// Ref'ler, render için kullanılmayan değerleri tutmak için bir kaçış kapısıdır. Onlara sık sık ihtiyacınız olmayacaktır.
// Bir ref, okuyabileceğiniz veya ayarlayabileceğiniz current adlı tek bir özelliğe sahip düz bir JavaScript nesnesidir.
// React'ten useRef Hook'unu çağırarak size bir ref vermesini isteyebilirsiniz.
// * State gibi ref'ler de bir bileşenin yeniden oluşturulması arasında bilgileri saklamanızı sağlar.
// State'in aksine, ref'in geçerli değerini ayarlamak yeniden oluşturmayı tetiklemez.
// Render sırasında ref.current değerini okumayın veya yazmayın. Bu, bileşeninizin tahmin edilmesini zorlaştırır.


// 2. Manipulating the DOM with Refs
// React, DOM'u render çıktınızla eşleşecek şekilde otomatik olarak günceller, bu nedenle bileşenlerinizin DOM'u manipüle etmesi genellikle gerekmez. Ancak, bazen React tarafından yönetilen DOM öğelerine erişmeniz gerekebilir; örneğin, bir düğüme odaklanmak, ona kaydırmak veya boyutunu ve konumunu ölçmek için. React'te bunları yapmanın yerleşik bir yolu yoktur, bu nedenle DOM düğümüne bir ref'e ihtiyacınız olacaktır.

export function Focus() {
    const inputRef = useRef(null)
    const handleClick = () => {
        inputRef.current.focus()
    }
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
                <legend>Country :</legend>
                <input ref={inputRef} />
                <button onClick={handleClick}>Focus!</button>
            </fieldset>
        </form>
    )
}

// Example:
export function ScrollIntoView() {
    const htmlRef = useRef(null);
    const cssRef = useRef(null);
    const jsRef = useRef(null);

    const handleClick = (e) => {
        if (e.target.id === 'html') {
            htmlRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
            })
        }
        else if (e.target.id === 'css') {
            cssRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
            })
        }
        else {
            jsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start'
            })
        }
    }
    return (
        <>
            <div className="scroll-container">
                <div style={{ backgroundColor: 'yellow' }} ref={htmlRef}>HTML</div>
                <div style={{ backgroundColor: 'blue' }} ref={cssRef}>CSS</div>
                <div style={{ backgroundColor: 'orange' }} ref={jsRef}>JS</div>
            </div>
            <div style={{ margin: '1rem auto', width: '480px' }}>
                <button onClick={(e) => handleClick(e)} id="html">Go HTML!</button>
                <button onClick={(e) => handleClick(e)} id="css">Go CSS!</button>
                <button onClick={(e) => handleClick(e)} id="js">Go JS!</button>
            </div>
        </>
    )
}

// Accessing another component’s DOM nodes 
// forwardRef, React'te ref'leri bir alt bileşene aktarmanıza olanak tanıyan bir üst düzey bileşendir (HOC). Genellikle bir alt bileşenin temel DOM düğümüne üst bileşeninden erişmeniz gerektiğinde veya bir ref'i daha yüksek dereceli bir bileşen aracılığıyla iletmek istediğinizde kullanılır.

export function HOCRef() {
    const ref = useRef(null)
    const handleFocus = () => {
        return ref.current.focus();
    }
    return (
        <>
            <MyComponent ref={ref} />
            <button onClick={handleFocus}>Focus!</button>
        </>
    )
}

const MyComponent = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
})

// When React attaches the refs 
// React'te her güncelleme iki aşamaya ayrılır:

// Render sırasında React, ekranda ne olması gerektiğini bulmak için bileşenlerinizi çağırır.
// Commit sırasında React değişiklikleri DOM'a uygular.

// Genel olarak, render sırasında ref'lere erişmek istemezsiniz. Bu, DOM düğümlerini tutan ref'ler için de geçerlidir. İlk render sırasında, DOM düğümleri henüz oluşturulmamıştır, bu nedenle ref.current null olacaktır. Ve güncellemelerin işlenmesi sırasında, DOM düğümleri henüz güncellenmemiştir. Bu yüzden onları okumak için çok erkendir.

// React, commit sırasında ref.current değerini ayarlar. DOM'u güncellemeden önce, React etkilenen ref.current değerlerini null olarak ayarlar. DOM'u güncelledikten sonra, React bunları hemen ilgili DOM düğümlerine ayarlar.

// Genellikle ref'lere olay işleyicilerinden erişirsiniz. Bir ref ile bir şey yapmak istiyorsanız, ancak bunu yapmak için belirli bir olay yoksa, bir useEffect'e ihtiyacınız olabilir.


// Deep Dive: Flushing state updates synchronously with flushSync 
// Yeni bir yapılacak iş ekleyen ve ekranı listenin son çocuğuna kaydıran aşağıdaki gibi bir kod düşünün. Bazı nedenlerden dolayı, her zaman son eklenenden hemen önceki yapılacak işe nasıl kaydırıldığına dikkat edin:
// Sorun şu iki satırda:

// setTodos([ ...todos, newTodo]);
// listRef.current.lastChild.scrollIntoView();

// React'te durum güncellemeleri kuyruğa alınır. Genellikle istediğiniz şey budur. Ancak, burada setTodos DOM'u hemen güncellemediği için bir soruna neden olur. Yani listeyi son öğesine kaydırdığınızda, todo henüz eklenmemiştir. Bu nedenle kaydırma işlemi her zaman bir öğe "geride kalır".

// Bu sorunu çözmek için React'i DOM'u eşzamanlı olarak güncellemeye ("flush") zorlayabilirsiniz. Bunu yapmak için, react-dom'dan flushSync'i içe aktarın ve durum güncellemesini bir flushSync çağrısına sarın:

let initialTodos = [];
for (let i = 0; i < 20; i++) {
    initialTodos.push({
        itemId: i + 1,
        todo: `Todo #${i + 1}`
    })
}

export function Todos() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(initialTodos);
    const listRef = useRef(null)

    const handleClick = () => {
        flushSync(() => {
            setText('');
            setTodos([
                ...todos,
                { itemId: initialTodos.length + 1, todo: text }
            ])
        })
        listRef.current.lastChild.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
    return (
        <>
            <h1>My Todos</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleClick}>Add!</button>
            <ul ref={listRef}>
                {
                    todos.map((todo) => {
                        return <li key={todo.itemId}>{todo.todo}</li>
                    })
                }
            </ul>
        </>
    )
}

// Bu, React'e flushSync'e sarılmış kod yürütüldükten hemen sonra DOM'u eşzamanlı olarak güncellemesi talimatını verecektir. Sonuç olarak, son yapılacak iş, siz ona kaydırmaya çalıştığınızda zaten DOM'da olacaktır.

// Best practices for DOM manipulation with refs 
// Refler bir kaçış kapısıdır. Bunları yalnızca "React'in dışına çıkmanız" gerektiğinde kullanmalısınız. Bunun yaygın örnekleri arasında odağı yönetmek, kaydırma konumu veya React'in göstermediği tarayıcı API'lerini çağırmak yer alır.

// Odaklanma ve kaydırma gibi yıkıcı olmayan eylemlere sadık kalırsanız, herhangi bir sorunla karşılaşmazsınız. Ancak, DOM'u manuel olarak değiştirmeye çalışırsanız, React'in yaptığı değişikliklerle çakışma riskiyle karşı karşıya kalabilirsiniz.

// Bu sorunu göstermek için, bu örnek bir karşılama mesajı ve iki düğme içerir. İlk düğme, React'te genellikle yaptığınız gibi koşullu oluşturma ve durum kullanarak varlığını değiştirir. İkinci düğme, React'in kontrolü dışında DOM'dan zorla kaldırmak için remove() DOM API'sini kullanır.

// "Toggle with setState" düğmesine birkaç kez basmayı deneyin. Mesaj kaybolmalı ve tekrar görünmelidir. Ardından "Remove from DOM" düğmesine basın. Bu onu zorla kaldıracaktır. Sonra birkez daha , "Toggle with setState "e basın:

export function DifferenceRefAndState() {
    const [show, setShow] = useState(true);
    const headerRef = useRef(null)
    return (
        <>
            {
                show && <h1 ref={headerRef}>Hello World!</h1>
            }
            <button onClick={() => setShow(!show)}>Toggle with setState!</button>
            <button onClick={() => headerRef.current.remove()}>Remove from DOM!</button>
            <br /><br /><br />
        </>
    )
}

// Özet
// Ref'ler genel bir kavramdır, ancak çoğu zaman bunları DOM öğelerini tutmak için kullanırsınız.
// React'e bir DOM düğümünü myRef.current içine koyması için <div ref={myRef}> ileterek talimat verirsiniz.
// Genellikle, ref'leri odaklanma, kaydırma veya DOM öğelerini ölçme gibi yıkıcı olmayan eylemler için kullanırsınız.
// Bir bileşen varsayılan olarak DOM düğümlerini göstermez. forwardRef kullanarak ve ikinci ref argümanını belirli bir düğüme aktararak bir DOM düğümünü açığa çıkarmayı seçebilirsiniz.
// React tarafından yönetilen DOM düğümlerini değiştirmekten kaçının.
// React tarafından yönetilen DOM düğümlerini değiştirirseniz, React'in güncellemek için bir nedeni olmadığı kısımları değiştirin.


// 3. Synchronizing with Effects
// Bazı bileşenlerin harici sistemlerle senkronize edilmesi gerekir. Örneğin, React olmayan bir bileşeni React durumuna göre kontrol etmek, bir sunucu bağlantısı kurmak veya bir bileşen ekranda göründüğünde bir analiz günlüğü göndermek isteyebilirsiniz. Efektler, bileşeninizi React dışındaki bir sistemle senkronize edebilmeniz için render işleminden sonra bazı kodlar çalıştırmanıza izin verir.

// What are Effects and how are they different from Events?
// Efektlere geçmeden önce, React bileşenleri içindeki iki tür mantığa aşina olmanız gerekir:

// Rendering Code: Bileşeninizin en üst seviyesinde yer alır. Burası prop'ları ve state'i aldığınız, dönüştürdüğünüz ve ekranda görmek istediğiniz JSX'i döndürdüğünüz yerdir. Render kodu saf olmalıdır. Bir matematik formülü gibi, yalnızca sonucu hesaplamalı, başka bir şey yapmamalıdır.

// Event Handler: Bileşenlerinizin içinde sadece hesaplama yapmak yerine bir şeyler yapan iç içe geçmiş işlevlerdir. Bir olay işleyici bir giriş alanını güncelleyebilir, bir ürün satın almak için HTTP POST isteği gönderebilir ya da kullanıcıyı başka bir ekrana yönlendirebilir. Olay işleyicileri, belirli bir kullanıcı eyleminin (örneğin, bir düğmeye tıklama veya yazma) neden olduğu "yan etkileri" (programın durumunu değiştirirler) içerir.

// Ancak bazen bu yeterli değildir. Ekranda her göründüğünde sohbet sunucusuna bağlanması gereken bir ChatRoom bileşeni düşünün. Bir sunucuya bağlanmak saf bir hesaplama değildir (bir yan etkidir), bu nedenle işleme sırasında gerçekleşemez. Ancak, ChatRoom'un görüntülenmesine neden olan tıklama gibi tek bir özel olay yoktur.

// Effectler, belirli bir olaydan ziyade render işleminin kendisinin neden olduğu yan etkileri belirtmenize olanak tanır. Sohbette bir mesaj göndermek bir 'Event'tir çünkü doğrudan kullanıcının belirli bir düğmeye tıklamasından kaynaklanır. Ancak, bir sunucu bağlantısı kurmak bir 'Effect'dir. Çünkü bileşenin görünmesine hangi etkileşim neden olursa olsun gerçekleşmelidir. Efektler, ekran güncellendikten sonra bir işlemin "sonunda" çalışır. Bu, React bileşenlerini bazı harici sistemlerle (ağ veya üçüncü taraf bir kütüphane gibi) senkronize etmek için iyi bir zamandır.

// You might be not need an Effect
// Bileşenlerinize Efekt eklemek için acele etmeyin. Efektlerin genellikle React kodunuzdan "çıkmak" ve bazı harici sistemlerle senkronize olmak için kullanıldığını unutmayın. Bu, tarayıcı API'lerini, üçüncü taraf widget'larını, ağı ve benzerlerini içerir. Eğer Efektiniz sadece bazı durumları diğer durumlara göre ayarlıyorsa, bir Efekte ihtiyacınız olmayabilir.

// How to write an Effect?
// Bir Effect yazmak için şu üç adımı izleyin:

// Bir Efekt bildirin. Varsayılan olarak, Efektiniz her render işleminden sonra çalışacaktır.

// Efekt bağımlılıklarını belirtin. Çoğu Efekt, her render işleminden sonra değil, yalnızca gerektiğinde yeniden çalışmalıdır. Örneğin, bir fade-in animasyonu yalnızca bir bileşen göründüğünde tetiklenmelidir. Bir sohbet odasına bağlanma ve bağlantıyı kesme yalnızca bileşen göründüğünde ve kaybolduğunda veya sohbet odası değiştiğinde gerçekleşmelidir. Bağımlılıkları belirleyerek bunu nasıl kontrol edeceğinizi öğreneceksiniz.

// Gerekirse "cleanup" ekleyin. Bazı Efektlerin yaptıkları işi nasıl durduracaklarını, geri alacaklarını veya temizleyeceklerini belirtmeleri gerekir. Örneğin, "connect" için "disconnect", "subscribe" için "unsubscribe" ve "fetch" için "cancel" ya da "ignore" gerekir. Bir temizleme fonksiyonu döndürerek bunu nasıl yapacağınızı öğreneceksiniz.

// Şimdi bu adımların her birine ayrıntılı olarak bakalım.

// Step 1: Declare an Effect
// Bileşeninizde bir Efekt bildirmek için, useEffect Hook'unu React'ten içe aktarın:
// import {useEffect} from 'react';

// Ardından, bileşeninizin en üst seviyesinde çağırın ve Efektinizin içine bazı kodlar koyun. Bileşeniniz her render olduğunda, React ekranı günceller ve ardından useEffect içindeki kodu çalıştırır. Başka bir deyişle, useEffect, render ekrana yansıyana kadar bir kod parçasının çalışmasını "geciktirir".

// Harici bir sistemle senkronize olmak için bir Efekti nasıl kullanabileceğinizi görelim. Bir <VideoPlayer> React bileşeni düşünün. Ona bir isPlaying prop'u ileterek oynatılıp oynatılmadığını veya duraklatılıp duraklatılmadığını kontrol etmek güzel olurdu:

function VideoPlayer({ isPlaying, src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            videoRef.current.play();
        }
        else {
            videoRef.current.pause();
        }
    })

    return (
        <video ref={videoRef} src={src} loop playsInline />
    )
}

export function PlayerApp() {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <VideoPlayer
                isPlaying={isPlaying}
                src='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
            />
            <br />
            <button
                style={{
                    display: 'block',
                    width: '25%',
                    padding: '1rem'
                }}
                onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </>
    )
}

// Eğer ki if bloğunun biz useEffect içine sarmasaydık bu kodu hata verirdi. Nedeni render sırasında DOM düğümü ile bir şeyler yapmaya çalışmasıdır. React'te render işlemi JSX'in saf bir hesaplaması olmalı ve DOM'u değiştirmek gibi yan etkiler içermemelidir.

// Dahası, VideoPlayer ilk kez çağrıldığında, DOM'u henüz mevcut değildir! Henüz play() veya pause() işlevlerini çağırmak için bir DOM düğümü yoktur, çünkü React siz JSX'i döndürene kadar hangi DOM'un oluşturulacağını bilmez.

// Buradaki çözüm, yan etkiyi render hesaplamasının dışına taşımak için useEffect ile sarmaktır. DOM güncellemesini bir Effect'e sararak, önce React'in ekranı güncellemesine izin verirsiniz. Ardından Efektiniz çalışır.

// VideoPlayer bileşeniniz render edildiğinde (ilk kez ya da yeniden render edildiğinde), birkaç şey gerçekleşecektir. İlk olarak, React ekranı güncelleyecek ve <video> etiketinin doğru prop'larla DOM'da olmasını sağlayacaktır. Ardından React, Efektinizi çalıştıracaktır. Son olarak, Efektiniz isPlaying değerine bağlı olarak play() veya pause() işlevlerini çağıracaktır.

// Bu örnekte, React state ile senkronize ettiğiniz "harici sistem" browser media API'si idi. Eski React olmayan kodları (jQuery eklentileri gibi) bildirimsel React bileşenlerine sarmak için benzer bir yaklaşım kullanabilirsiniz.

// Bir video oynatıcıyı kontrol etmenin pratikte çok daha karmaşık olduğunu unutmayın. play() çağrısı başarısız olabilir, kullanıcı yerleşik tarayıcı denetimlerini kullanarak oynatabilir veya duraklatabilir vb. Bu örnek çok basitleştirilmiş ve eksiktir.

// Dikkat!
// Varsayılan olarak, Efektler her render işleminden sonra çalışır. Bu nedenle bunun gibi kodlar sonsuz bir döngü oluşturacaktır:
// const [count, setCount] = useState(0);
// useEffect(() => {
//   setCount(count + 1);

// Efektler işleme sonucunda çalışır. Durum ayarı oluşturmayı tetikler. Bir Efektte durumu hemen ayarlamak, bir elektrik prizini kendi kendine takmak gibidir. Efekt çalışır, durumu ayarlar, bu da yeniden oluşturmaya neden olur, bu da Efektin çalışmasına neden olur, durumu tekrar ayarlar, bu da başka bir yeniden oluşturmaya neden olur ve bu böyle devam eder.

// Efektler genellikle bileşenlerinizi harici bir sistemle senkronize etmelidir. Harici bir sistem yoksa ve yalnızca bazı durumları diğer durumlara göre ayarlamak istiyorsanız, bir Efekte ihtiyacınız olmayabilir.


// Step 2: Specify the Effect dependencies 
// Varsayılan olarak, Efektler her render işleminden sonra çalışır. Genellikle istediğiniz bu değildir:

// Bazen yavaş olabilir. Harici bir sistemle senkronizasyon her zaman anlık değildir, bu nedenle gerekli olmadıkça bunu yapmayı atlamak isteyebilirsiniz. Örneğin, her tuş vuruşunda sohbet sunucusuna yeniden bağlanmak istemezsiniz.
// Bazen bu yanlıştır. Örneğin, her tuş vuruşunda bir bileşen fade-in animasyonunu tetiklemek istemezsiniz. Animasyon, bileşen ilk kez göründüğünde yalnızca bir kez oynatılmalıdır.

// Sorunu göstermek için, birkaç console.log çağrısı ve ana bileşenin durumunu güncelleyen bir metin girişi içeren örneği burada bulabilirsiniz. Yazmanın Efektin yeniden çalışmasına nasıl neden olduğuna dikkat edin.useEffect çağrısının ikinci argümanı olarak bir dizi bağımlılık belirterek React'e Efekt'i gereksiz yere yeniden çalıştırmayı atlamasını söyleyebilirsiniz. Örneğin useEffect fonksiyonuna boş bir [] dizisi ekleyerek başlayın: 

// React Hook useEffect'in eksik bir bağımlılığa sahip olduğunu söyleyen bir hata görmelisiniz: 'isSeen': "React Hook useEffect has a missing dependency: 'isSeen'. Either include it or remove the dependency array."
// Sorun, Efektinizin içindeki kodun ne yapacağına karar vermek için isSeen prop'una bağlı olması, ancak bu bağımlılığın açıkça bildirilmemesidir. Bu sorunu çözmek için bağımlılık dizisine isSeen öğesini ekleyin:

export function Dependencies() {
    const [isSeen, setIsSeen] = useState(true);
    const [text, setText] = useState('');

    useEffect(() => {
        if (isSeen) {
            console.log('Message seen!');
        }
        else {
            console.log('Message hidden!');
        }
    }, [isSeen])
    return (
        <>
            <br /><br />
            <input value={text} onChange={(e) => setText(e.target.value)} />
            {
                isSeen && <h1>Hello World!</h1>
            }
            <button onClick={() => setIsSeen(!isSeen)}>{isSeen ? 'Hide the message!' : 'See the message!'}</button>
        </>
    )
}

// Artık tüm bağımlılıklar bildirilmiştir, bu nedenle hata yoktur. Bağımlılık dizisi olarak [isSeen] belirtmek, React'e, isSeen önceki render sırasında olduğu gibi aynıysa Efektinizi yeniden çalıştırmayı atlaması gerektiğini söyler. Bu değişiklikle, girişe yazmak Efektin yeniden çalışmasına neden olmaz, ancak See/Hide'a basmak olur.

// Bağımlılık dizisi birden fazla bağımlılık içerebilir. React, yalnızca belirttiğiniz tüm bağımlılıklar önceki render sırasında sahip oldukları değerlerle tamamen aynı değerlere sahipse Efekti yeniden çalıştırmayı atlar. React, Object.is karşılaştırmasını kullanarak bağımlılık değerlerini karşılaştırır. Ayrıntılar için useEffect referansına bakın.

// Bağımlılıklarınızı "seçemeyeceğinize" dikkat edin. Belirttiğiniz bağımlılıklar, Efektinizin içindeki koda bağlı olarak React'in bekledikleriyle eşleşmezse bir lint hatası alırsınız. Bu, kodunuzdaki birçok hatayı yakalamanıza yardımcı olur. Bazı kodların yeniden çalışmasını istemiyorsanız, Efekt kodunun kendisini o bağımlılığa "ihtiyaç duymayacak" şekilde düzenleyin.

// Bağımlılık dizisi olmadan ve boş bir [] bağımlılık dizisi ile davranışlar farklıdır:

// useEffect(() => {
//     // This runs after every render
//   });

//   useEffect(() => {
//     // This runs only on mount (when the component appears)
//   }, []);

//   useEffect(() => {
//     // This runs on mount *and also* if either a or b have changed since the last render
//   }, [a, b]);


// Step 3: Add cleanup if needed
// Farklı bir örnek düşünün. Göründüğünde sohbet sunucusuna bağlanması gereken bir ChatRoom bileşeni yazıyorsunuz. Size connect() ve disconnect() yöntemleriyle bir nesne döndüren bir createConnection() API'si verildi. Kullanıcıya gösterilirken bileşeni nasıl bağlı tutarsınız?

// Her yeniden oluşturmadan sonra sohbete bağlanmak yavaş olacaktır, bu nedenle bağımlılık dizisini eklersiniz. Effect'in içindeki kod herhangi bir prop veya state kullanmaz, bu nedenle bağımlılık diziniz [] (boş) olur. Bu, React'e bu kodu yalnızca bileşen "bağlandığında", yani ekranda ilk kez göründüğünde çalıştırmasını söyler.

function ChatJS() {
    return {
        connect() {
            console.log('Connecting...');
        },
        disconnect() {
            console.log('Disconnected!');
        }
    }
}

export function ChatApp() {
    useEffect(() => {
        const connection = ChatJS();
        connection.connect();
        return () => {
            connection.disconnect();
        }
    }, [])
    return <h1>Welcome to the ChatJS!</h1>
}

// Bu Effect yalnızca mount üzerinde çalışır, bu nedenle "✅ Bağlanıyor..." ifadesinin konsolda bir kez yazdırılmasını bekleyebilirsiniz. Ancak, konsolu kontrol ederseniz, "✅ Bağlanıyor..." iki kez yazdırılır. Bu neden oluyor? (Strict Mode)

// ChatApp bileşeninin birçok farklı ekrana sahip daha büyük bir uygulamanın parçası olduğunu düşünün. Kullanıcı ChatApp sayfasında yolculuğuna başlıyor. Bileşen bağlanır ve connection.connect() işlevini çağırır. Ardından kullanıcının başka bir ekrana, örneğin Ayarlar sayfasına gittiğini düşünün. ChatApp bileşeni bağlantıyı kaldırır. Son olarak, kullanıcı Geri'ye tıklar ve ChatApp tekrar bağlanır. Bu ikinci bir bağlantı kurar, ancak ilk bağlantı asla yok edilmez! Kullanıcı uygulama içinde gezindikçe bağlantılar birikmeye devam eder.

// Bunun gibi hataları kapsamlı manuel testler olmadan gözden kaçırmak kolaydır. Bunları hızlı bir şekilde tespit etmenize yardımcı olmak için, geliştirme sırasında React her bileşeni ilk montajından hemen sonra bir kez yeniden bağlar.

// "✅ Bağlanıyor..." günlüğünü iki kez görmek gerçek sorunu fark etmenize yardımcı olur: kodunuz bileşen ayrıldığında bağlantıyı kapatmaz.

// Sorunu çözmek için, Efektinizden bir "cleanup" fonksiyonu döndürüz. React, Efekt tekrar çalışmadan önce her seferinde ve bileşen kaldırıldığında (kod satırından çıktığında!) son bir kez temizleme fonksiyonunuzu çağıracaktır. Temizleme fonksiyonu uygulandığında ne olacağını görelim. 

// Şimdi geliştirme aşamasında üç konsol günlüğü elde edersiniz:

// "✅ Bağlanıyor..."
// "❌ Bağlantı kesildi."
// "✅ Bağlanıyor..."
// Bu, geliştirmede doğru davranıştır. Bileşeninizi yeniden bağlayarak React, uzaklaşmanın ve geri dönmenin kodunuzu bozmayacağını doğrular. Bağlantıyı kesmek ve sonra tekrar bağlanmak tam olarak olması gereken şeydir! Temizleme işlemini iyi uyguladığınızda, Efekti bir kez çalıştırmak ile çalıştırmak, temizlemek ve tekrar çalıştırmak arasında kullanıcı tarafından görülebilir bir fark olmamalıdır. React, geliştirme sırasında kodunuzda hata olup olmadığını araştırdığı için fazladan bir bağlanma/bağlantı kesme çağrı çifti vardır. Bu normaldir, ortadan kaldırmaya çalışmayın!

// Üretimde, yalnızca bir kez "✅ Bağlanıyor..." yazdırıldığını görürsünüz. Bileşenlerin yeniden takılması yalnızca geliştirme aşamasında, temizlenmesi gereken Efektleri bulmanıza yardımcı olmak için gerçekleşir. Geliştirme davranışını devre dışı bırakmak için Sıkı Modu kapatabilirsiniz, ancak açık tutmanızı öneririz. Bu, yukarıdaki gibi birçok hatayı bulmanızı sağlar.

// How to handle the Effect firing twice in development? 
// React, son örnekteki gibi hataları bulmak için geliştirme sırasında bileşenlerinizi kasıtlı olarak yeniden bağlar. Doğru soru "bir Efekti bir kez nasıl çalıştırırım" değil, "Efektimi yeniden bağlandıktan sonra çalışacak şekilde nasıl düzeltirim" olmalıdır.

// Genellikle cevap, temizleme işlevini uygulamaktır. Temizleme işlevi, Efekt ne yapıyorsa onu durdurmalı veya geri almalıdır. Temel kural, kullanıcının Efektin bir kez çalışması (üretimde olduğu gibi) ile bir kurulum → temizleme → kurulum dizisi (geliştirmede göreceğiniz gibi) arasında ayrım yapamaması gerektiğidir.

// Yazacağınız Efektlerin çoğu aşağıdaki yaygın kalıplardan birine uyacaktır:

// 1. Controlling non-React widgets 
// Bazen React'e yazılmamış UI bileşenleri eklemeniz gerekir. Örneğin, sayfanıza bir harita bileşeni eklediğinizi varsayalım. Bir setZoomLevel() yöntemi var ve yakınlaştırma düzeyini React kodunuzdaki bir zoomLevel durum değişkeniyle senkronize tutmak istiyorsunuz. Efektiniz buna benzer görünecektir:

// useEffect(() => {
//     const map = mapRef.current;
//     map.setZoomLevel(zoomLevel);
//   }, [zoomLevel]);

// Bu durumda herhangi bir temizleme gerekmediğini unutmayın. Geliştirme aşamasında React, Effect'i iki kez çağıracaktır, ancak bu bir sorun değildir çünkü setZoomLevel'i "aynı değerle iki kez çağırmak" hiçbir şey yapmaz. Biraz daha yavaş olabilir, ancak bu önemli değildir çünkü "üretimde gereksiz yere yeniden yüklenmeyecektir".

// Bazı API'ler bunları arka arkaya iki kez çağırmanıza izin vermeyebilir. Örneğin, yerleşik <dialog> öğesinin showModal yöntemi iki kez çağrılırsa atar. Temizleme işlevini uygulayın ve iletişim kutusunu kapatmasını sağlayın:

// useEffect(() => {
//     const dialog = dialogRef.current;
//     dialog.showModal();
//     return () => dialog.close();
//   }, []);

// Geliştirme aşamasında, Efektiniz showModal() işlevini çağıracak, ardından hemen close() işlevini ve ardından tekrar showModal() işlevini çağıracaktır. Bu, üretimde göreceğiniz gibi showModal() işlevini bir kez çağırmakla aynı kullanıcı tarafından görülebilir davranışa sahiptir.

// 2. Subscribing to events
// Efektiniz bir şeye abone olursa, temizleme işlevi aboneliği iptal etmelidir:

// useEffect(() => {
//     function handleScroll(e) {
//       console.log(window.scrollX, window.scrollY);
//     }
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

// Geliştirme aşamasında, Efektiniz addEventListener() işlevini çağıracak, ardından hemen removeEventListener() işlevini çağıracak ve ardından aynı işleyiciyle tekrar addEventListener() işlevini çağıracaktır. Böylece aynı anda yalnızca bir aktif abonelik olacaktır. Bu, üretimde olduğu gibi addEventListener() işlevini bir kez çağırmakla aynı kullanıcı tarafından görülebilir davranışa sahiptir.

// 3. Triggering animations 
// Efektiniz bir şeyi canlandırırsa, temizleme işlevi animasyonu başlangıç değerlerine sıfırlamalıdır:

// useEffect(() => {
//     const node = ref.current;
//     node.style.opacity = 1; // Trigger the animation
//     return () => {
//       node.style.opacity = 0; // Reset to the initial value
//     };
//   }, []);

// Geliştirme aşamasında opaklık önce 1'e, sonra 0'a ve sonra tekrar 1'e ayarlanacaktır. Bu, doğrudan 1'e ayarlamakla aynı kullanıcı tarafından görülebilir davranışa sahip olmalıdır, bu da üretimde gerçekleşecek olan şeydir. Tweening desteği olan bir üçüncü taraf animasyon kütüphanesi kullanıyorsanız, temizleme işleviniz zaman çizelgesini ilk durumuna sıfırlamalıdır.

// 4. Fetching Data
// Efektiniz bir şey getirirse, temizleme işlevi ya getirme işlemini "abort" etmeli ya da sonucu "ignore" etmelidir.

export function IgnoreData() {
    const [data, setData] = useState([]);
    useEffect(() => {
        let ignore = false;
        const fetchData = async() => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await res.json();
            if(!ignore) {
                setData(users);
                console.log('Data loaded!');
            }
        }
        fetchData();

        return () => {
            ignore = true;
            console.log('Data ignored!');
        }
    }, [])
    return(
        <ul>
            {
                data.map((user) => {
                    return <li key={user.id}>{user.name}</li>
                })
            }
        </ul>
    )
}

// Geliştirme aşamasında, Ağ sekmesinde iki getirme göreceksiniz. Bunda yanlış bir şey yoktur. Yukarıdaki yaklaşımla, ilk Etki hemen temizlenecek ve böylece ignore değişkeninin kopyası true olarak ayarlanacaktır. Böylece fazladan bir istek olsa bile, if (!ignore) kontrolü sayesinde durumu etkilemeyecektir.

// Üretimde yalnızca bir istek olacaktır. Geliştirme aşamasındaki ikinci istek sizi rahatsız ediyorsa, en iyi yaklaşım istekleri tekilleştiren ve yanıtlarını bileşenler arasında önbelleğe alan bir çözüm kullanmaktır.

// Deep Dive: What are good alternatives to data fetching in Effects? 
// Effects içinde fetch çağrıları yazmak, özellikle tamamen istemci tarafı uygulamalarda veri getirmenin popüler bir yoludur. Ancak bu çok manuel bir yaklaşımdır ve önemli dezavantajları vardır:

// Efektler sunucu üzerinde çalışmaz. Bu, sunucu tarafından işlenen ilk HTML'nin yalnızca veri içermeyen bir yükleme durumu içereceği anlamına gelir. İstemci bilgisayarın tüm JavaScript'i indirmesi ve uygulamanızı oluşturması, ancak şimdi verileri yüklemesi gerektiğini keşfetmesi gerekecektir. Bu çok verimli değildir.

// Doğrudan Effects'te getirme işlemi "ağ şelaleleri" oluşturmayı kolaylaştırır. Ana bileşeni oluşturursunuz, bileşen bazı verileri getirir, alt bileşenleri oluşturur ve ardından onlar da kendi verilerini getirmeye başlar. Ağ çok hızlı değilse, bu işlem tüm verileri paralel olarak getirmekten önemli ölçüde daha yavaştır.

// Doğrudan Effects'te getirmek genellikle verileri önceden yüklemediğiniz veya önbelleğe almadığınız anlamına gelir. Örneğin, bileşen bağlantıyı keser ve sonra yeniden bağlanırsa, verileri yeniden getirmesi gerekir.

// Bu pek ergonomik değildir. Getirme çağrılarını yarış koşulları gibi hatalara maruz kalmayacak şekilde yazarken oldukça fazla şablon kodu vardır.

// Bu dezavantajlar listesi React'e özgü değildir. Herhangi bir kütüphane ile mount üzerinde veri getirme için geçerlidir. Yönlendirmede olduğu gibi, veri getirme işlemini iyi yapmak önemsiz değildir, bu nedenle aşağıdaki yaklaşımları öneriyoruz:

// Eğer bir framework kullanıyorsanız, onun yerleşik veri getirme mekanizmasını kullanın. Modern React framework'leri, verimli olan ve yukarıdaki tuzaklardan muzdarip olmayan entegre veri getirme mekanizmalarına sahiptir.
// Aksi takdirde, istemci tarafında bir önbellek kullanmayı veya oluşturmayı düşünün. Popüler açık kaynak çözümleri arasında React Query, useSWR ve React Router 6.4+ bulunmaktadır. Kendi çözümünüzü de oluşturabilirsiniz, bu durumda kaputun altındaki Effects'i kullanırsınız, ancak istekleri tekilleştirmek, yanıtları önbelleğe almak ve ağ şelalelerinden kaçınmak için mantık eklersiniz (verileri önceden yükleyerek veya veri gereksinimlerini rotalara kaldırarak).
// Bu yaklaşımlardan hiçbiri size uymuyorsa verileri doğrudan Effects'te almaya devam edebilirsiniz.


// Özet:
// Olayların aksine, Efektler belirli bir etkileşimden ziyade render işleminin kendisinden kaynaklanır.
// Efektler, bir bileşeni bazı harici sistemlerle (üçüncü taraf API, ağ, vb.) senkronize etmenizi sağlar.
// Varsayılan olarak, Efektler her render işleminden sonra çalışır (ilk render dahil).
// React, tüm bağımlılıkları son render sırasında aynı değerlere sahipse Efekt'i atlayacaktır.
// Bağımlılıklarınızı "seçemezsiniz". Bunlar Efektin içindeki kod tarafından belirlenir.
// Boş bağımlılık dizisi ([]), bileşenin "monte edilmesine", yani ekrana eklenmesine karşılık gelir.
// Strict Mode'da React, Efektlerinizi stres testine tabi tutmak için bileşenleri iki kez bağlar (yalnızca geliştirme aşamasında!).
// Efektiniz yeniden bağlanma nedeniyle bozulursa, bir temizleme işlevi uygulamanız gerekir.
// React, Efekt bir sonraki sefer çalışmadan önce ve yeniden bağlama sırasında temizleme işlevinizi çağıracaktır.


// 4. You Might Not Need an Effect
// Efektler, React paradigmasından bir kaçış kapısıdır. React'in "dışına çıkmanıza" ve bileşenlerinizi React olmayan bir widget, ağ veya tarayıcı DOM'u gibi bazı harici sistemlerle senkronize etmenize izin verirler. Eğer harici bir sistem söz konusu değilse (örneğin, bazı prop'lar veya durum değişiklikleri olduğunda bir bileşenin durumunu güncellemek istiyorsanız), bir Efekt'e ihtiyacınız olmamalıdır. Gereksiz Efektleri kaldırmak kodunuzu takip etmeyi kolaylaştıracak, daha hızlı çalıştıracak ve daha az hataya eğilimli hale getirecektir.

// How to remove unnecessary Effects 
// Efektlere ihtiyaç duymadığınız iki yaygın durum vardır:

// 1. Verileri işlemek üzere dönüştürmek için Efektlere ihtiyacınız yoktur. Örneğin, bir listeyi görüntülemeden önce filtrelemek istediğinizi varsayalım. Liste değiştiğinde bir durum değişkenini güncelleyen bir Efekt yazmak size cazip gelebilir. Ancak bu verimsizdir. Durumu güncellediğinizde, React önce ekranda ne olması gerektiğini hesaplamak için bileşen fonksiyonlarınızı çağıracaktır. Ardından React bu değişiklikleri DOM'a "işleyecek" ve ekranı güncelleyecektir. Ardından React Efektlerinizi çalıştıracaktır. Efektiniz de durumu hemen güncellerse, bu tüm süreci sıfırdan başlatır! Gereksiz render geçişlerinden kaçınmak için, bileşenlerinizin en üst seviyesindeki tüm verileri dönüştürün. Bu kod, aksesuarlarınız veya durumunuz her değiştiğinde otomatik olarak yeniden çalışacaktır.

// 2. Kullanıcı olaylarını işlemek için Efektlere ihtiyacınız yoktur. Örneğin, bir /api/buy POST isteği göndermek ve kullanıcı bir ürün satın aldığında bir bildirim göstermek istediğinizi varsayalım. Satın Al düğmesi tıklama olay işleyicisinde tam olarak ne olduğunu bilirsiniz. Bir Efekt çalıştığında, kullanıcının ne yaptığını (örneğin, hangi düğmeye tıklandığını) bilemezsiniz. Bu nedenle kullanıcı olaylarını genellikle ilgili olay işleyicilerinde ele alırsınız.


// Harici sistemlerle senkronize olmak için Efektlere ihtiyacınız vardır. Örneğin, bir jQuery widget'ını React durumu ile senkronize tutan bir Efekt yazabilirsiniz. Ayrıca Efektlerle veri getirebilirsiniz: örneğin, arama sonuçlarını geçerli arama sorgusuyla senkronize edebilirsiniz. Modern çerçevelerin, doğrudan bileşenlerinize Efekt yazmaktan daha verimli yerleşik veri getirme mekanizmaları sağladığını unutmayın.

// Doğru sezgiyi kazanmanıza yardımcı olmak için bazı yaygın somut örneklere bakalım!

// A. Updating state based on props or state
export function GetName() {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    // const [fullName, setFullName] = useState('')

    // useEffect(() => {
    //     setFullName(name + ' ' + surName)
    // }, [name, surName])

    // Bu, gerekenden daha karmaşıktır. Ayrıca verimsizdir: fullName için eski bir değerle tüm bir render geçişini yapar, ardından güncellenmiş değerle hemen yeniden render eder. Durum değişkenini ve Efekti kaldırın:

    const fullName = name + ' ' + surName

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setName(e.target.value)
        }
        else{
            setSurName(e.target.value)
        }
    }

    return(
        <div>
            <h1>Welcome {fullName}</h1>
            <input placeholder='Name' name='name' value={name} onChange={(e) => handleChange(e)}/>
            <input placeholder='Surname' name='surName' value={surName} onChange={(e) => handleChange(e)}/>
        </div>
    )
}

// Bir şey mevcut sahne veya durumdan hesaplanabiliyorsa, bunu duruma koymayın. Bunun yerine, oluşturma sırasında hesaplayın. Bu, kodunuzu daha hızlı (ekstra "basamaklı" güncellemelerden kaçınırsınız), daha basit (bazı kodları kaldırırsınız) ve daha az hata eğilimli (farklı durum değişkenlerinin birbiriyle senkronize olmamasından kaynaklanan hataları önlersiniz) hale getirir.

// B. Caching expensive calculations


// 5. Lifecycle of Reactive Effects
// Etkilerin bileşenlerden farklı bir yaşam döngüsü vardır. Bileşenler bağlanabilir, güncellenebilir veya kaldırılabilir. Bir Efekt yalnızca iki şey yapabilir: bir şeyi senkronize etmeye başlamak ve daha sonra senkronize etmeyi durdurmak. Efektiniz zaman içinde değişen prop'lara ve state'e bağlıysa bu döngü birden çok kez gerçekleşebilir. React, Efektinizin bağımlılıklarını doğru bir şekilde belirttiğinizi kontrol etmek için bir linter kuralı sağlar. Bu, Efektinizin en son prop ve state ile senkronize olmasını sağlar.

