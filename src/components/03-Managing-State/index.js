import { useReducer, useState } from 'react';
import ThemeProvider, { useTheme } from './context/ThemeContext';

// Managing State

// 1. Reacting to Input With State
// React'in kullanıcı arayüzleri oluşturmaya yönelik bildirimsel (declarative) yaklaşımı, tasarımcıların kullanıcı arayüzlerini nasıl kavramsallaştırdıklarıyla iyi bir uyum içindedir. React, istenen sonuçları elde etmek için DOM'u zorunlu olarak manipüle etmek yerine, geliştiricilerin herhangi bir zamanda UI'nin durumunu tanımlamasına olanak tanır. Bu, söz konusu görünümü elde etmek için adım adım talimatlar yerine farklı durumlara veya verilere dayalı olarak kullanıcı arayüzünün nasıl görünmesi gerektiğine odaklanmak anlamına gelir.

// UI'nin çeşitli durumlara veya prop'lara göre nasıl oluşturulması gerektiğini tanımlayarak React bileşenleri daha öngörülebilir ve yönetimi daha kolay hale gelir. Bu yaklaşım, kullanıcı arayüzünün davranışı hakkında mantık yürütmeyi kolaylaştırır ve kod, kullanıcı arayüzünün kavramsal modeline daha çok benzediği için geliştiriciler ve tasarımcılar arasında daha kolay işbirliği sağlar. Ayrıca, React'te uygulama oluşturmanın temel bir ilkesi olan yeniden kullanılabilir ve birleştirilebilir bileşenlerin geliştirilmesini kolaylaştırır.

// Kullanıcı arayüzü etkileşimlerini tasarlarken, muhtemelen kullanıcı eylemlerine yanıt olarak kullanıcı arayüzünün nasıl değiştiğini düşünürsünüz. Kullanıcının bir yanıt göndermesini sağlayan bir form düşünün:

// Forma bir şey yazdığınızda, "Gönder" düğmesi etkin hale gelir.
// "Gönder" düğmesine bastığınızda, hem form hem de düğme devre dışı kalır ve bir döndürücü görünür.
// Ağ isteği başarılı olursa, form gizlenir ve "Teşekkürler" mesajı görünür.
// Ağ isteği başarısız olursa, bir hata mesajı görüntülenir ve form tekrar etkin hale gelir.

// Imperative programlamada, yukarıdakiler doğrudan etkileşimi nasıl uyguladığınıza karşılık gelir. Az önce ne olduğuna bağlı olarak kullanıcı arayüzünü manipüle etmek için tam talimatları yazmanız gerekir. Bunu düşünmenin başka bir yolu da şudur: Arabada birinin yanına bindiğinizi ve ona adım adım nereye gideceğini söylediğinizi hayal edin. Nereye gitmek istediğinizi bilmezler, sadece komutlarınızı takip ederler. (Yönlendirmeleri yanlış yaparsanız, kendinizi yanlış yerde bulursunuz!) Buna zorunluluk (imperative) deniyor çünkü döndürücüden düğmeye kadar her bir öğeye "komut vermeniz" ve bilgisayara kullanıcı arayüzünü nasıl güncelleyeceğini söylemeniz gerekiyor.

// Kullanıcı arayüzünü zorunlu olarak manipüle etmek, izole örnekler için yeterince iyi çalışır, ancak daha karmaşık sistemlerde yönetilmesi katlanarak daha zor hale gelir. Bunun gibi farklı formlarla dolu bir sayfayı güncellediğinizi düşünün. Yeni bir kullanıcı arayüzü öğesi veya yeni bir etkileşim eklemek, bir hata (örneğin, bir şeyi göstermeyi veya gizlemeyi unutmak) eklemediğinizden emin olmak için mevcut tüm kodların dikkatlice kontrol edilmesini gerektirir.

// React bu sorunu çözmek için inşa edilmiştir.

// React'te kullanıcı arayüzünü doğrudan manipüle etmezsiniz; yani bileşenleri doğrudan etkinleştirmez, devre dışı bırakmaz, göstermez veya gizlemezsiniz. Bunun yerine, neyi göstermek istediğinizi bildirirsiniz ve React kullanıcı arayüzünü nasıl güncelleyeceğini bulur. Bir taksiye bindiğinizi ve sürücüye tam olarak nereye döneceğini söylemek yerine nereye gitmek istediğinizi söylediğinizi düşünün. Sizi oraya götürmek sürücünün işidir ve hatta sizin düşünmediğiniz bazı kestirme yolları da biliyor olabilirler!

// React'te bildirimsel UI yaklaşımını daha iyi nasıl düşüneceğinizi anlamak için bir uygulama yapacağız. Adımlarımız: 

// Bileşeninizin farklı görsel durumlarını "tanımlayın".
// Bu durum değişikliklerini neyin tetiklediğini "belirleyin".
// useState kullanarak durumu bellekte "temsil eder".
// Gerekli olmayan durum değişkenlerini "kaldırın".
// Durumu ayarlamak için olay işleyicilerini "bağlayın".


// ADIM 1: Bileşeninizin farklı görsel durumlarını tanımlayın.
// Bilgisayar biliminde, bir "durum makinesinin" çeşitli "durumlardan" birinde olduğunu duyabilirsiniz. Eğer bir tasarımcı ile çalışıyorsanız, farklı "görsel durumlar" için maketler görmüş olabilirsiniz. React, tasarım ve bilgisayar biliminin kesiştiği noktada durmaktadır, bu nedenle bu fikirlerin her ikisi de ilham kaynağıdır.

// Öncelikle, kullanıcının görebileceği kullanıcı arayüzünün tüm farklı "durumlarını" görselleştirmeniz gerekir:

// Empty: Form has a disabled “Submit” button.
// Typing: Form has an enabled “Submit” button.
// Submitting: Form is completely disabled. Spinner is shown.
// Success: “Thank you” message is shown instead of a form.
// Error: Same as Typing state, but with an extra error message.

// Tıpkı bir tasarımcı gibi, mantık eklemeden önce farklı durumlar için "maket" veya "mock" oluşturmak isteyeceksiniz. Örneğin, burada formun sadece görsel kısmı için bir model bulunmaktadır. Bu mock, varsayılan değeri 'boş' olan status adlı bir prop tarafından kontrol edilir:

export function MockForm1( {status = 'empty'} ) {
    if(status === 'success') {
        return <h1>That's right!</h1>
    }
    return(
        <>
        <h2>City quiz</h2>
        <p>
          In which city is there a billboard that turns air into drinkable water?
        </p>
        <form>
          <textarea disabled={status === 'submitting'} />
          <br />
          <button disabled={status === 'empty' || status === 'submitting'}>
            Submit!
          </button>
          {
            status === 'error' && 
            <h2 className="err">Good guess but a wrong answer. Try again!</h2>
          }
        </form>
      </>
    )
}

// Bir bileşenin çok sayıda görsel durumu varsa, bunların hepsini tek bir sayfada göstermek uygun olabilir. Bu gibi sayfalar genellikle "living styleguides" veya "storybooks" olarak adlandırılır.


export function StoryBooks() {
    const statues = [
        'empty',
        'typing',
        'submitting',
        'success',
        'error'
    ];

    return(
        <>
        {
            statues.map((status) => {
                return (
                    <div key={status}>
                        <hr />
                        <h1>Status : {status}</h1>
                        <MockForm1 status={status} />
                        <hr />
                    </div>
                )
            })
        }
        </>
    )
}


// ADIM 2: Bu durum değişikliklerini neyin tetiklediğini "belirleyin".
// İki tür girdiye yanıt olarak durum güncellemelerini tetikleyebilirsiniz:

// Bir düğmeye tıklamak, bir alana yazmak, bir bağlantıda gezinmek gibi "insan" girdileri.
// Bir ağ yanıtının gelmesi, bir zaman aşımının tamamlanması, bir görüntünün yüklenmesi gibi "bilgisayar" girdileri.

// Her iki durumda da, kullanıcı arayüzünü güncellemek için durum değişkenlerini ayarlamanız gerekir. Geliştirmekte olduğunuz form için, birkaç farklı girdiye yanıt olarak durumu değiştirmeniz gerekecektir:

// Metin girişinin değiştirilmesi (insan), metin kutusunun boş olup olmamasına bağlı olarak 'empty' durumdan 'typing' durumuna veya geri dönmelidir.
// Submit düğmesine tıklandığında (insan) 'submitting' durumuna geçmelidir.
// Başarılı ağ yanıtı (bilgisayar) onu 'success' durumuna geçirmelidir.
// Başarısız ağ yanıtı (bilgisayar), eşleşen hata mesajıyla birlikte 'error' durumuna geçirmelidir.

// İnsan girdilerinin genellikle olay işleyicileri gerektirdiğine dikkat edin!


// ADIM 3: useState ile bellekteki durumu "temsil edin".
// Daha sonra bileşeninizin görsel durumlarını useState ile bellekte temsil etmeniz gerekecektir. Basitlik anahtardır: her durum parçası bir "hareketli parçadır" ve mümkün olduğunca az "hareketli parça" istersiniz. Daha fazla karmaşıklık daha fazla hataya yol açar!

// Kesinlikle orada olması gereken durumla başlayın. Örneğin, girdi için yanıtı ve son hatayı saklamak için hatayı (varsa) saklamanız gerekir:
// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);

// Ardından, görsel durumlardan hangisini görüntülemek istediğinizi temsil eden bir durum değişkenine ihtiyacınız olacaktır. Bunu bellekte temsil etmenin genellikle birden fazla yolu vardır, bu nedenle denemeler yapmanız gerekecektir.

// Hemen en iyi yolu bulmakta zorlanıyorsanız, tüm olası görsel durumların kapsandığından kesinlikle emin olacağınız kadar durum ekleyerek başlayın:
// const [isEmpty, setIsEmpty] = useState(true);
// const [isTyping, setIsTyping] = useState(false);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [isSuccess, setIsSuccess] = useState(false);
// const [isError, setIsError] = useState(false);

// İlk fikriniz muhtemelen en iyisi olmayacaktır, ancak bu sorun değil - durumu yeniden düzenlemek sürecin bir parçasıdır!


// ADIM 4: Gerekli olmayan durum değişkenlerini "kaldırın".
// Durum içeriğinde yinelemelerden kaçınmak istersiniz, böylece yalnızca gerekli olanları izlersiniz. Durum yapınızı yeniden düzenlemek için biraz zaman harcamak bileşenlerinizin anlaşılmasını kolaylaştıracak, tekrarları azaltacak ve istenmeyen anlamları önleyecektir. Amacınız, bellekteki durumun bir kullanıcının görmesini isteyeceğiniz geçerli bir kullanıcı arayüzünü temsil etmediği durumları önlemektir. (Örneğin, asla bir hata mesajı gösterip aynı zamanda girişi devre dışı bırakmak istemezsiniz, aksi takdirde kullanıcı hatayı düzeltemez!)

// Durumlarınızı bu sorularla kontrol edin!
// Bu durum bir paradoksa neden olur mu?
// Örneğin, isTyping ve isSubmitting durumlarının her ikisi de doğru olamaz. Bir paradoks genellikle durumun yeterince kısıtlı olmadığı anlamına gelir. İki boole'un dört olası kombinasyonu vardır, ancak yalnızca üçü geçerli durumlara karşılık gelir. "İmkansız" durumu ortadan kaldırmak için, bunları üç değerden biri olması gereken bir durum halinde birleştirebilirsiniz: 'typing', 'submitting' veya 'success'.

// Aynı bilgi başka bir durum değişkeninde zaten mevcut mu?
// Başka bir paradoks: isEmpty ve isTyping aynı anda doğru olamaz. Bunları ayrı durum değişkenleri haline getirerek, senkronize olmamaları ve hatalara neden olmaları riskini alırsınız. Neyse ki, isEmpty'yi kaldırabilir ve bunun yerine answer.length === 0'ı kontrol edebilirsiniz.

// Aynı bilgiyi başka bir durum değişkeninin tersinden de elde edebilir misiniz?
//isError gerekli değildir çünkü bunun yerine error !== null değerini kontrol edebilirsiniz.

// Bu temizlikten sonra:
// const [answer, setAnswer] = useState('');
// const [error, setError] = useState(null);
// const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'


// ADIM 5: Durumu ayarlamak için olay işleyicilerini "bağlayın".
// Son olarak, durumu güncelleyen olay işleyicileri oluşturun. Aşağıda, tüm olay işleyicilerinin bağlandığı son form yer almaktadır:

export function Form() {
    const [status, setStatus] = useState('typing');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null)

    if(status === 'success') {
        return (
            <h1>That's right!</h1>
        )
    }
    else if(status === 'submitting') {
        return (
            <h1>Loading...</h1>
        )
    }

    const handleChange = (e) => {
        setAnswer(e.target.value)
        setError(null)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await answerCheck(answer);
            setStatus('success');
        }
        catch(err) {
            setError(err);
            setStatus('typing');
            setAnswer('')
            console.dir(err);
        }
    }

    return(
        <div>
            <h1>City Quiz</h1>
            <h3>Which city has 'Troy Horse'?</h3>
            <form>
                <textarea
                    value={answer}
                    onChange={handleChange}
                    disabled={ status === 'submitting' } />
                <br />
                <input
                    type="submit"
                    onClick={handleClick}
                    disabled={ answer.length === 0 || status === 'submitting' }/>
            </form>
            {
                error !== null && <h2 className='err'>{error.message}</h2>
            }
        </div>
    )
}

const answerCheck = (answer) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(answer.trim().toLowerCase() === 'çanakkale') {
                return resolve();
            }
            else {
                return reject(new Error('Wrong!'))
            }
        }, 1500)
    })
}


// SONUÇ olarak : 
// Declarative programlama, kullanıcı arayüzünü mikro yönetmek (imperative) yerine, her görsel durum için kullanıcı arayüzünü tanımlamak anlamına gelir.

// Bir bileşen geliştirirken:

// Tüm görsel durumlarını tanımlayın.
// Durum değişiklikleri için insan ve bilgisayar tetikleyicilerini belirleyin.
// Durumu useState ile modelleyin.
// Hataları ve paradoksları önlemek için gerekli olmayan durumları kaldırın.
// Durumu ayarlamak için olay işleyicilerini bağlayın.


// 2. Choosing the State Structure
// Durumu iyi yapılandırmak, değiştirmesi ve hata ayıklaması keyifli bir bileşen ile sürekli hata kaynağı olan bir bileşen arasında fark yaratabilir. İşte state'i yapılandırırken göz önünde bulundurmanız gereken bazı ipuçları.

// Bazı durumları tutan bir bileşen yazdığınızda, kaç durum değişkeni kullanacağınız ve verilerinin şeklinin ne olması gerektiği konusunda seçimler yapmanız gerekecektir. Optimal olmayan bir durum yapısıyla bile doğru programlar yazmak mümkün olsa da, daha iyi seçimler yapmanız için size rehberlik edebilecek birkaç ilke vardır:

// 1. İlgili durumları gruplayın
// İki veya daha fazla durum değişkenini her zaman aynı anda güncelliyorsanız, bunları tek bir durum değişkeninde birleştirmeyi düşünün.

// 2. Durumdaki çelişkileri önleyin
// Durum, birkaç durum parçasının birbiriyle çelişebileceği ve "uyuşmayabileceği" şekilde yapılandırıldığında, hatalara yer bırakırsınız. Bundan kaçınmaya çalışın.

// 3. Gereksiz durumlardan kaçının
// Bileşenin prop'larından veya mevcut durum değişkenlerinden render sırasında bazı bilgileri hesaplayabiliyorsanız, bu bilgileri bileşenin durumuna koymamalısınız.

// 4. Durumda yinelemeden kaçının
// Aynı veriler birden fazla durum değişkeni arasında veya iç içe geçmiş nesneler içinde yinelendiğinde, bunları senkronize tutmak zordur. Mümkün olduğunda çoğaltmayı azaltın.

// 5. Derinlemesine iç içe geçmiş durumlardan kaçının
// Derin hiyerarşik durum güncellemek için çok uygun değildir. Mümkün olduğunda, durumu düz bir şekilde yapılandırmayı tercih edin.

// Bu ilkelerin arkasındaki amaç, hatalara yol açmadan durumu güncellemeyi kolaylaştırmaktır. Gereksiz ve yinelenen verileri durumdan kaldırmak, tüm parçalarının senkronize kalmasını sağlamaya yardımcı olur. Bu, bir veritabanı mühendisinin hata olasılığını azaltmak için veritabanı yapısını "normalleştirmek" istemesine benzer. Albert Einstein'ın sözleriyle ifade edecek olursak, "Durumunuzu olabildiğince basit hale getirin, ama daha basit olmasın."

// Şimdi bunları açıklamaya çalışalım: 

    // 1. İlgili durumları gruplayın
    // Bazen tek veya birden fazla durum değişkeni kullanmak arasında kararsız kalabilirsiniz.

    // Bunu yapmalı mısınız?
    
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);

    // Ya da bu?
    // const [position, setPosition] = useState({ x: 0, y: 0 });

    // Teknik olarak, bu yaklaşımlardan herhangi birini kullanabilirsiniz. Ancak bazı iki durum değişkeni her zaman birlikte değişiyorsa, bunları tek bir durum değişkeninde birleştirmek iyi bir fikir olabilir. Böylece, imleci hareket ettirmenin kırmızı noktanın her iki koordinatını da güncellediği bu örnekte olduğu gibi, onları her zaman senkronize tutmayı unutmazsınız:

    export function RedDot() {
        const [position, setPosition] = useState({x: 0, y: 0});

        const handleMouseMove = (e) => {
            console.dir(e.clientY)
            console.dir(e.pageY)
            console.dir(e.screenY)
            setPosition({
                ...position,
                x: e.clientX,
                y: e.clientY - 360
            })
        }

        return(
            <div style={{
                border: '1px solid blue',
                width: '1480px',
                height: '360px',
                position: 'relative'
                }}
                onMouseMove={handleMouseMove}
                >
                    <div style={{
                        position: 'absolute',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                        backgroundColor: 'red'
                    }}>
                    </div>
            </div>
        )
    }

    // Durum değişkeniniz bir nesne ise, diğer alanları açıkça kopyalamadan içindeki yalnızca bir alanı güncelleyemeyeceğinizi unutmayın. Örneğin, yukarıdaki örnekte setPosition({ x: 100 }) yapamazsınız çünkü y özelliğine sahip olmayacaktır! Bunun yerine, yalnızca x'i ayarlamak istiyorsanız ya setPosition({ ...position, x: 100 }) yaparsınız ya da bunları iki durum değişkenine böler ve setX(100) yaparsınız.


    // 2. Durumdaki çelişkileri önleyin
    // İşte isSending ve isSent durum değişkenlerine sahip bir otel geri bildirim formu. Bu kod çalışsa da "imkansız" durumlar için açık kapı bırakır. Örneğin, setIsSent ve setIsSending öğelerini birlikte çağırmayı unutursanız, hem isSending hem de isSent öğelerinin aynı anda doğru olduğu bir durumla karşılaşabilirsiniz. Bileşeniniz ne kadar karmaşık olursa, ne olduğunu anlamak da o kadar zorlaşır.

    // isSending ve isSent hiçbir zaman aynı anda doğru olmaması gerektiğinden, bunları üç geçerli durumdan birini alabilen tek bir durum değişkeni ile değiştirmek daha iyidir: 'typing' (başlangıç), 'sending' ve 'sent':

    export function HotelFeedBack() {
        const [text, setText] = useState('');
        const [status, setStatus] = useState('');

        if(status === 'sent') {
            return <h1>Thanks your feedback!</h1>
        }

        const handleChange = (e) => {
            setText(e.target.value);
        }

        const handleClick = async () => {
            setStatus('sending');
            await postMessage();
            setStatus('sent')
        }

        return (
            <div>
                <br />
                <form>
                    <fieldset>
                        <legend>Hotel Customer Service</legend>
                        <textarea
                            value={text}
                            onChange={handleChange}
                            disabled={status === 'sending'}/>
                        <br />
                        <input
                            type='submit'
                            value={'Send!'}
                            onClick={handleClick}
                            disabled={text.length === 0 || status === 'sending'}/>
                    </fieldset>
                </form>
            </div>
        )
    }

async function postMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        },1500)
    })
}


    // 3. Gereksiz durumlardan kaçının
    // Render sırasında bileşenin prop'larından veya mevcut durum değişkenlerinden bazı bilgileri hesaplayabiliyorsanız, bu bilgileri bileşenin durumuna koymamalısınız.

    // Örneğin: yukarıda ki örnekte bir 'empty' durumu ayarlanabilirdi. Ancak text.value === 0 da aynı işlevi göreceği için bu durumu bildirmedik.


    // 4. Durumda yinelemelerden kaçının


    // 5. Derin iç içe geçmiş durumlardan kaçının


// 3. Sharing State Between Components
// Bazen iki bileşenin durumunun her zaman birlikte değişmesini istersiniz. Bunu yapmak için, state'i her ikisinden de kaldırın, en yakın ortak ebeveynlerine taşıyın ve ardından prop'lar aracılığıyla onlara aktarın. Bu, state'i yukarı kaldırmak olarak bilinir ve React kodu yazarken yapacağınız en yaygın şeylerden biridir.

// Lifting state up by example 
// Bu örnekte, bir üst Accordion bileşeni iki ayrı Panel oluşturur:

// Accordion
// Panel
// Panel
// Her Panel bileşeni, içeriğinin görünür olup olmadığını belirleyen bir boolean "isActive" durumuna sahiptir.

// Her iki panel için de "Show" düğmesine basın:
export function Accordion() {
    return(
        <div>
            <h1>Almaty, Khazakistan</h1>
            <Panel title='About'>
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel title='Etymology'>
                The name comes from алма, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>
        </div>
    )
}

function Panel({title, children}) {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
        <h3>{title}</h3>
            {
                isActive ? (
                    <p>{children}</p>
                ) : (
                    <button onClick={() => setIsActive((prev) => !prev)}>Show</button>
                )
            }
        </>
    )
}

// Bir panelin düğmesine basmanın diğer paneli nasıl etkilemediğine dikkat edin - bunlar bağımsızdır.

// Ancak şimdi bunu herhangi bir zamanda yalnızca bir panelin genişletileceği şekilde değiştirmek istediğinizi varsayalım. Bu tasarımla, ikinci paneli genişletmek birincisini daraltmalıdır. Bunu nasıl yapacaksınız?

// Bu iki paneli koordine etmek için, üç adımda bir üst bileşene "durumlarını yukarı kaldırmanız" gerekir:

// 1. Alt bileşenlerden durumu kaldırın.
// 2. Ortak üst öğeden sabit kodlanmış verileri geçirin.
// 3. Ortak üst öğeye durum ekleyin ve olay işleyicileriyle birlikte aşağı aktarın.
// Bu, Akordeon bileşeninin her iki Paneli de koordine etmesine ve her seferinde yalnızca birini genişletmesine olanak tanıyacaktır.

    // 1. Alt Bileşenden Durumu Kaldırın
    // Panel'in isActive'inin kontrolünü ana bileşenine vereceksiniz. Bu, ana bileşenin isActive değerini Panel'e bir prop olarak aktaracağı anlamına gelir.
    
    //Bu satırı Panel bileşeninden kaldırarak başlayın:
    // const [isActive, setIsActive] = useState(false);

    // Ve bunun yerine, Panel'in prop listesine isActive öğesini ekleyin:
    // function Panel({ title, children, isActive }) {

    // Artık Panel'in ana bileşeni isActive değerini bir prop olarak aktararak kontrol edebilir. Tersine, Panel bileşeni artık isActive değeri üzerinde hiçbir kontrole sahip değildir; bu artık ana bileşene bağlıdır!

    // function Panel({title, children, isActive}) {
    //     return (
    //         <>
    //         <h3>{title}</h3>
    //             {
    //                 isActive ? (
    //                     <p>{children}</p>
    //                 ) : (
    //                     <button onClick={() => setIsActive((prev) => !prev)}>Show</button>
    //                 )
    //             }
    //         </>
    //     )
    // }

    // 2. İlk Ortak Üst Bileşenden Sabit Verileri Geçirin
    // Durumu yükseltmek için, koordine etmek istediğiniz her iki alt bileşenin en yakın ortak üst bileşenini bulmanız gerekir:

    // Accordion (en yakın ortak ebeveyn)
    // Panel
    // Panel

    // Bu örnekte, bu Accordion bileşenidir. Her iki panelin de üzerinde olduğundan ve onların desteklerini kontrol edebildiğinden, hangi panelin o anda etkin olduğu konusunda "gerçeğin kaynağı" olacaktır. Accordion bileşeninin her iki panele de kodlanmış bir "isActive" değeri (örneğin true) iletmesini sağlayın.

    // export function Accordion() {
    //     return(
    //         <div>
    //             <h1>Almaty, Khazakistan</h1>
    //             <Panel title='About'>
    //                 With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
    //             </Panel>
    //             <Panel title='Etymology' isActive={true}>
    //                 The name comes from <span lang='kk-KZ'>алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
    //             </Panel>
    //         </div>
    //     )
    // }


    // 3. Ortak Ebeveyne Durum Ekleyin
    // Durumu yukarı kaldırmak genellikle durum olarak depoladığınız şeyin doğasını değiştirir.

    // Bu durumda, aynı anda yalnızca bir panel etkin olmalıdır. Bu, Accordion ortak ana bileşeninin hangi panelin aktif olduğunu takip etmesi gerektiği anlamına gelir. Bir boolean değeri yerine, durum değişkeni için aktif Panelin indeksi olarak bir sayı kullanabilir.

    // activeIndex 0 olduğunda, ilk panel etkindir ve 1 olduğunda, ikinci panel etkindir.

    // Herhangi bir Panelde "Show" düğmesine tıklandığında, Accordion'daki aktif indeksin değiştirilmesi gerekir. Bir Panel activeIndex durumunu doğrudan ayarlayamaz çünkü bu durum Accordion içinde tanımlanmıştır. Accordion bileşeninin, bir olay işleyicisini prop olarak geçirerek Panel bileşeninin durumunu değiştirmesine açıkça izin vermesi gerekir.

    export function NewAccordion() {
        const [activeIndex, setActiveIndex] = useState(0)

        return (
            <div>
                <NewPanel
                    title='About'
                    isActive={activeIndex === 0}
                    onShow={() => setActiveIndex(0)}
                    >
                    With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
                </NewPanel>
                <NewPanel
                    title='Etymology'
                    isActive={activeIndex === 1}
                    onShow={() => setActiveIndex(1)}
                    >
                    The name comes from алма, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild Malus sieversii is considered a likely candidate for the ancestor of the modern domestic apple.
                </NewPanel>
            </div>
        )
    }

    function NewPanel({title, children, isActive, onShow}) {
        return (
            <>
                <h3>{title}</h3>
                {
                    isActive ? (
                        <p>{children}</p>
                    ) : (
                        <button
                            onClick={onShow}
                        >Show!</button>
                    )
                }
            </>
        )
    }

// Bu, durumu yukarı kaldırmayı tamamlar! Durumu ortak üst bileşene taşımak, iki paneli koordine etmenizi sağladı. İki "is shown" bayrağı yerine aktif indeksi kullanmak, belirli bir zamanda yalnızca bir panelin aktif olmasını sağladı. Ve olay işleyiciyi çocuğa aktarmak, çocuğun ebeveynin durumunu değiştirmesine izin verdi.

// Deep Dive: Kontrollü ve Kontrolsüz Bileşenler
// Bazı yerel durumlara sahip bir bileşeni "kontrolsüz" olarak adlandırmak yaygındır. Örneğin, isActive durum değişkenine sahip orijinal Panel bileşeni kontrolsüzdür çünkü üst öğesi panelin etkin olup olmadığını etkileyemez.

// Buna karşılık, bir bileşen içindeki önemli bilgiler kendi yerel durumu yerine destekleyiciler tarafından yönlendiriliyorsa o bileşenin "kontrollü" olduğunu söyleyebilirsiniz. Bu, ana bileşenin davranışını tamamen belirlemesine olanak tanır. isActive prop'una sahip son Panel bileşeni, Accordion bileşeni tarafından kontrol edilir.

// Kontrolsüz bileşenlerin ebeveynleri içinde kullanımı daha kolaydır çünkü daha az yapılandırma gerektirirler. Ancak bunları birlikte koordine etmek istediğinizde daha az esnektirler. Kontrollü bileşenler maksimum düzeyde esnektir, ancak ana bileşenlerin onları prop'larla tam olarak yapılandırmasını gerektirir.

// Uygulamada, "kontrollü" ve "kontrolsüz" katı teknik terimler değildir - her bileşen genellikle hem yerel durum hem de desteklerin bir karışımına sahiptir. Ancak bu, bileşenlerin nasıl tasarlandığı ve hangi yetenekleri sundukları hakkında konuşmak için kullanışlı bir yoldur.

// Bir bileşen yazarken, içindeki hangi bilgilerin kontrol edilmesi gerektiğini (prop'lar aracılığıyla) ve hangi bilgilerin kontrol edilmemesi gerektiğini (state aracılığıyla) düşünün. Ancak her zaman fikrinizi değiştirebilir ve daha sonra yeniden düzenleyebilirsiniz.

// Bir React uygulamasında, birçok bileşen kendi state'ine sahip olacaktır. Bazı state'ler, girdiler gibi yaprak bileşenlere (ağacın en altındaki bileşenler) yakın "yaşayabilir". Diğer state'ler ise uygulamanın tepesine daha yakın "yaşayabilir". Örneğin, istemci tarafı yönlendirme kütüphaneleri bile genellikle mevcut rotayı React state'inde depolayarak ve bunu prop'larla aşağı aktararak uygulanır!

// Her bir benzersiz durum parçası için, ona "sahip olan" bileşeni seçeceksiniz. Bu ilke aynı zamanda "tek bir doğruluk kaynağına" sahip olmak olarak da bilinir. Bu, tüm durumların tek bir yerde bulunduğu anlamına gelmez; ancak her durum parçası için o bilgi parçasını tutan belirli bir bileşen vardır. Paylaşılan durumu bileşenler arasında çoğaltmak yerine, ortak paylaşılan ebeveynlerine kaldırın ve ihtiyaç duyan çocuklara aktarın.

// Uygulamanız siz üzerinde çalıştıkça değişecektir. Durumun her bir parçasının nerede "yaşadığını" bulmaya çalışırken durumu aşağı veya yukarı taşımanız yaygındır. Bunların hepsi sürecin bir parçasıdır!

// Bunun pratikte nasıl hissettirdiğini birkaç bileşenle daha görmek için Thinking in React'i okuyun.


// 4. Preserving and Resetting State
// Durum bileşenler arasında izole edilmiştir. React, UI ağacındaki yerlerine göre hangi state'in hangi bileşene ait olduğunu takip eder. State'in ne zaman korunacağını ve yeniden oluşturma arasında ne zaman sıfırlanacağını kontrol edebilirsiniz.

// == State, Render Ağacındaki Konuma Bağlıdır ==

// React, kullanıcı arayüzünüzdeki bileşen yapısı için render ağaçları oluşturur.

// Bir bileşene state verdiğinizde, state'in bileşenin içinde "yaşadığını" düşünebilirsiniz. Ancak durum aslında React'in içinde tutulur. React, tuttuğu her state parçasını, o bileşenin render ağacında bulunduğu yere göre doğru bileşenle ilişkilendirir.

// Burada, yalnızca bir <Counter /> JSX etiketi vardır, ancak iki farklı konumda işlenmiştir:
export function Base() {
    const [isActive, setIsActive] = useState(true)
    return (
        <>
        <Counter title='First' />
        {
            isActive && <Counter title='Second' />
        }
        <label>
            <input
                type='checkbox'
                checked={isActive}
                onChange={() => setIsActive((prev) => !prev)}
            />
            Included second counter
        </label>
        </>
    )
}

function Counter({title}) {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount((prev) => prev + 1)
    }

    return (
        <div>
            <div className='counter'>
                <h1>{title} Counter</h1>
                <h2>{count}</h2>
                <button onClick={handleClick}>Increment</button>
            </div>
        </div>
    )
}

// Bunlar iki ayrı sayaçtır çünkü her biri ağaçta kendi konumunda işlenir. React'i kullanmak için genellikle bu konumlar hakkında düşünmeniz gerekmez, ancak nasıl çalıştığını anlamak faydalı olabilir.

// ==== NOT ====
// React'te, ekrandaki her bileşen tamamen izole edilmiş bir duruma sahiptir. Örneğin, iki Counter bileşenini yan yana render ederseniz, her biri kendi bağımsız skor durumlarına sahip olacaktır.

// Her iki sayaca da tıklamayı deneyin ve birbirlerini etkilemediklerini fark edin.

// React, aynı bileşeni ağaçta aynı konumda render ettiğiniz sürece durumu koruyacaktır. Bunu görmek için, her iki sayacı da artırın, ardından "İkinci sayacı işle" onay kutusunun işaretini kaldırarak ikinci bileşeni kaldırın ve ardından tekrar işaretleyerek geri ekleyin:

// İkinci sayacı oluşturmayı bıraktığınız anda, durumunun nasıl tamamen kaybolduğuna dikkat edin. Bunun nedeni, React bir bileşeni kaldırdığında, durumunu yok etmesidir. "Included second counter" seçeneğini işaretlediğinizde, ikinci bir Sayaç ve durumu sıfırdan başlatılır (score = 0) ve DOM'a eklenir.


// == Aynı Konumdaki Aynı Bileşen Durumu Korur ==

// Bu örnekte, ayn konumda iki farklı <Counter /> etiketi bulunmaktadır:
export function Base1() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChange = (e) => {
        if(e.target.value === 'first') {
            setCurrentIndex(0);
        }
        else{
            setCurrentIndex(1);
        }
    }

    return (
        <>
        {
            currentIndex === 0 ? (
                <Counter title='First' />
            ) : (
                <Counter title='Second' />
            )
        }
        <label>
            <select onChange={handleChange}>
                <option value={'first'}>First Counter</option>
                <option value={'second'}>Second Counter</option>
            </select>
        </label>
        </>
    )
}

// Counter'lar değişsede sayacın kaldığı yerden devam etmesine dikkat edin. Aynı konumdaki aynı bileşendir, bu nedenle React'in bakış açısından aynı sayaçtır.

// React için önemli olanın JSX işaretlemesindeki değil, UI ağacındaki konum olduğunu unutmayın! Bu bileşen, eğer ki if içinde ve dışında farklı <Counter /> JSX etiketlerine sahip iki return döndürseydi bile:

// Select öğesi değiştiğinde durumun sıfırlanmasını bekleyebilirdik, ancak sıfırlanmayacaktı! Bunun nedeni, bu <Counter /> etiketlerinin her ikisinin de aynı konumda render edilmesidir. React, fonksiyonunuzda koşulları nereye yerleştirdiğinizi bilmez. Tek "gördüğü" döndürdüğünüz ağaçtır.

// Her iki durumda da Base bileşeni, ilk alt öğesi <Counter /> olan bir <div> döndürür. React için bu iki sayaç aynı "adrese" sahiptir: Base component'ının ilk çocuğu. React, mantığınızı nasıl yapılandırdığınızdan bağımsız olarak, bunları önceki ve sonraki render'lar arasında bu şekilde eşleştirir.


// Aynı Konumdaki Farklı Bileşenler Durumu Sıfırlar

export function Break() {
    const[isBreak, setIsBreak] = useState(false);

    const handleChange = () => {
        return setIsBreak((prev) => !prev)
    }

    return(
        <>
        {
            isBreak ? (
                <h2>Counter paused!</h2>
            ) : (
                <Counter title='First' />
            )
        }
        <label>
            <input
                type='checkbox'
                checked={isBreak}
                onChange={handleChange}
            />
            {
                isBreak ? <b>Go on!</b> : <b>Pause!</b>
            }
        </label>
        </>
    )
}

// Burada, aynı konumda farklı bileşen türleri arasında geçiş yaparsınız. Başlangıçta, ilk çocuğu bir Sayaç içeriyordu. Ancak bir p ile değiştirdiğinizde, React Counter'ı UI ağacından kaldırdı ve durumunu yok etti.

// Bu durumlarda yeni bir return ifadesi yazarken kapsayıcı öğelere de dikkat etmek gerekir. Yani bir div elementi içindeki Counter bileşininin yerine bir section elementi içinde ki Counter bileşeninin render edilmesi durumu korumayacaktır!

// Genel bir kural olarak, yeniden render'lar arasında durumu korumak istiyorsanız, ağacınızın yapısının bir render'dan diğerine "eşleşmesi" gerekir. Yapı farklıysa, React ağaçtan bir bileşeni kaldırdığında durumu yok ettiği için durum yok olur.


// Aynı Konumda Aynı Bileşenlerin Durumu Sıfırlaması:

// Varsayılan olarak, React bir bileşenin durumunu aynı konumda aynı bileşenken korur. Genellikle, bu tam olarak istediğiniz şeydir, bu nedenle varsayılan davranış olarak mantıklıdır. Ancak bazen, Aynı iki bileşenin durumunu aynı konumdayken korumak istemeyebilirsiniz (Ayrı ayrı tutmak isteyebilirsiniz!). İki oyuncunun her turda skorlarını takip etmesini sağlayan bu uygulamayı düşünün:

export function Scoreboard() {
    const [isPlayerA, setIsPlayerA] = useState(true);

    const handleClick = () => {
        setIsPlayerA((prev) => !prev)
    }

    return (
        <>
        {
            isPlayerA ? (
                <Player person='John' />
            ) : (
                <Player person='Sarah' />
            )
        }
        <button onClick={handleClick}>Change Player!</button>
        </>
    )
}

function Player({person}) {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount((prev) => prev + 1)
    }

    return(
        <div className='counter'>
            <h2>{person}</h2>
            <h2>{count}</h2>
            <button onClick={handleClick}>Score!</button>
        </div>
    )
}

// Şu anda, oyuncuyu değiştirdiğinizde skor korunur. İki Sayaç aynı konumda görünür, bu nedenle React onları kişi prop'u değişen aynı Sayaç olarak görür.

// Ancak kavramsal olarak, bu uygulamada iki ayrı sayaç olmalıdır. Kullanıcı arayüzünde aynı yerde görünebilirler, ancak biri Taylor için bir sayaç ve diğeri Sarah için bir sayaçtır.

// Bunlar arasında geçiş yaparken durumu sıfırlamanın iki yolu vardır:

// Bileşenleri farklı konumlarda oluşturma
// Her bileşene anahtar ile açık bir kimlik verme

// Seçenek 1: Bir bileşeni farklı konumlarda oluşturma
export function Scoreboard1() {
    const [isPlayerA, setIsPlayerA] = useState(true);
    const handleClick = () => {
        setIsPlayerA((prev) => !prev)
    }
    return(
        <div>
            {
                isPlayerA && <Player person='John' />
            }
            {
                !isPlayerA && <Player person='Sarah' />
            }
            <button onClick={handleClick}>Change Player!</button>
        </div>
    )
}

// Başlangıçta, isPlayerA doğrudur. Yani ilk pozisyon Sayaç durumunu içerir ve ikincisi boştur.
// "Sonraki oyuncu" düğmesine tıkladığınızda ilk konum temizlenir ancak ikinci konum artık bir Sayaç içerir.

// Her Sayacın durumu, DOM'dan her kaldırıldığında yok edilir. Bu yüzden düğmeye her tıkladığınızda sıfırlanırlar.
// Bu çözüm, aynı yerde işlenen yalnızca birkaç bağımsız bileşene sahip olduğunuzda kullanışlıdır. Bu örnekte, yalnızca iki tane var, bu nedenle JSX'te her ikisini de ayrı ayrı oluşturmak zor değil.


// Seçenek 2: Her bileşene anahtar ile açık bir kimlik verme:
// Bir bileşenin durumunu sıfırlamanın daha genel bir yolu daha vardır.

// Listeleri oluştururken anahtarları görmüş olabilirsiniz. Anahtarlar sadece listeler için değildir! React'in herhangi bir bileşen arasında ayrım yapmasını sağlamak için anahtarları kullanabilirsiniz. Varsayılan olarak React, bileşenler arasında ayrım yapmak için ebeveyn içindeki sıralamayı ("ilk sayaç", "ikinci sayaç") kullanır. Ancak anahtarlar, React'e bunun yalnızca birinci veya ikinci sayaç değil, belirli bir sayaç olduğunu söylemenizi sağlar - örneğin, Taylor'ın sayacı. Bu şekilde React, Taylor'ın sayacını ağacın neresinde görünürse görünsün tanıyacaktır!

// Bu örnekte, iki <Counter /> JSX'te aynı yerde görünmelerine rağmen durumu paylaşmazlar:

export function Scoreboard2() {
    const [isPlayerA, setIsPlayerA] = useState(true);

    const handleClick = () => {
        setIsPlayerA((prev) => !prev)
    }

    return (
        <>
        {
            isPlayerA ? (
                <Player key='taylor' person='John' />
            ) : (
                <Player key='sarah' person='Sarah' />
            )
        }
        <button onClick={handleClick}>Change Player!</button>
        </>
    )
}

// Taylor ve Sarah arasında geçiş yapmak durumu korumaz. Bunun nedeni onlara farklı anahtarlar vermiş olmanızdır.

// Bir anahtar belirtmek, React'e anahtarın kendisini ebeveyn içindeki sıraları yerine konumun bir parçası olarak kullanmasını söyler. Bu nedenle, JSX'te aynı yerde render etseniz bile, React bunları iki farklı sayaç olarak görür ve bu nedenle asla state paylaşmazlar. Bir sayaç ekranda her göründüğünde, durumu oluşturulur. Her kaldırıldığında, durumu yok edilir. Aralarında geçiş yapmak durumlarını tekrar tekrar sıfırlar.

// Anahtarların global olarak benzersiz olmadığını unutmayın. Yalnızca "ebeveyn" içindeki konumu belirtirler!


// Formu Bir Anahtarla Sıfırlama
export function Chat() {
    const contacts = ['Alice', 'Sarah', 'John'];
    const [selectedContact, setSelectedContact] = useState(contacts[0])
    const handleClick = (e) => {
        const sendTo = contacts.find((person) => {
            return person === e.target.innerHTML;
        })
        setSelectedContact(sendTo)
    }
    return(
        <>
        <Contacts contacts={contacts} onClick={handleClick} />
        <ChatBar key={selectedContact} selectedContact={selectedContact} />
        </>
    )
}

function Contacts({contacts, onClick}) {
    return (
        <div>
            {
                contacts.map((person) => {
                    return <button onClick={onClick} key={person}>{person}</button>
                })
            }
        </div>
    )
}

function ChatBar({selectedContact}) {
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <textarea placeholder={`Send to ${selectedContact}`} />
                <br />
                <input type='submit' value={`Send ${selectedContact}`} />
            </form>
        </div>
    )
}

// Girişe bir şey girmeyi deneyin ve ardından farklı bir alıcı seçmek için "Alice" veya "Bob" tuşuna basın. Giriş durumunun korunduğunu fark edeceksiniz çünkü <ChatBar> ağaçta aynı konumda oluşturulur.

// Birçok uygulamada bu istenen bir davranış olabilir, ancak bir sohbet uygulamasında değil! Kullanıcının yanlışlıkla tıklaması nedeniyle önceden yazdığı bir mesajı yanlış bir kişiye göndermesine izin vermek istemezsiniz. Bunu düzeltmek için bir tuş ekledik:

// <ChatBar key={selectedContact} ... />

// Bu, farklı bir alıcı seçtiğinizde, Sohbet bileşeninin, altındaki ağaçtaki tüm durumlar da dahil olmak üzere sıfırdan yeniden oluşturulmasını sağlar. React ayrıca DOM öğelerini yeniden kullanmak yerine yeniden oluşturacaktır.

// Artık alıcının değiştirilmesi her zaman metin alanını temizler.


// Deep Dive : 
// Gerçek bir sohbet uygulamasında, kullanıcı önceki alıcıyı tekrar seçtiğinde muhtemelen giriş durumunu kurtarmak istersiniz. Artık görünür olmayan bir bileşen için durumu "canlı" tutmanın birkaç yolu vardır:

// Sadece mevcut sohbet yerine tüm sohbetleri görüntüleyebilir, ancak diğerlerini CSS ile gizleyebilirsiniz. Sohbetler ağaçtan kaldırılmayacağı için yerel durumları korunmuş olur. Bu çözüm basit kullanıcı arayüzleri için harika çalışır. Ancak gizli ağaçlar büyükse ve çok sayıda DOM düğümü içeriyorsa çok yavaş olabilir.

// Durumu yukarı kaldırabilir ve üst bileşendeki her alıcı için bekleyen mesajı tutabilirsiniz. Bu şekilde, alt bileşenler kaldırıldığında önemli değildir, çünkü önemli bilgileri tutan üst bileşendir. Bu en yaygın çözümdür.

// React state'e ek olarak farklı bir kaynak da kullanabilirsiniz. Örneğin, muhtemelen kullanıcı sayfayı yanlışlıkla kapatsa bile bir mesaj taslağının kalıcı olmasını istersiniz. Bunu uygulamak için, Sohbet bileşeninin localStorage'dan okuyarak durumunu başlatmasını ve taslakları da buraya kaydetmesini sağlayabilirsiniz.


// Hangi stratejiyi seçerseniz seçin, Alice ile yapılan bir sohbet kavramsal olarak Bob ile yapılan bir sohbetten farklıdır, bu nedenle <Chat> ağacına mevcut alıcıya dayalı bir anahtar vermek mantıklıdır.



// 5. Extracting State Logic into a Reducer
// Birçok olay işleyicisine yayılmış çok sayıda durum güncellemesine sahip bileşenler bunaltıcı olabilir. Bu gibi durumlarda, bileşeninizin dışındaki tüm durum güncelleme mantığını "reducer" adı verilen tek bir işlevde birleştirebilirsiniz. UseState'e bir alternatiftir ve özellikle durum mantığı karmaşık olduğunda ve birden fazla alt değer içerdiğinde veya bir sonraki durum bir öncekine bağlı olduğunda kullanışlıdır.

// useReducer kancası iki argüman alır: bir redüktör fonksiyonu ve bir başlangıç durumu (array.reduce ile tamamen aynı!). Redükleyici işlevi, gönderilen eylemlere yanıt olarak durumun nasıl güncellenmesi gerektiğini belirtir. Geçerli durumu ve bir eylemi alır ve bu eyleme dayalı yeni durumu döndürür.:

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true, editable: false},
  {id: 1, text: 'Watch a Puppet Show', done: false, editable: false},
  {id: 2, text: 'Lennon Wall Picture', done: false, editable: false}
];

export function TaskApp() {
    const [tasks, setTasks] = useState(initialTasks);

    const handleAddTask = (task) => {
        setTasks([
            ...tasks,
            {
                id: nextId++,
                text: task,
                done: false,
                editable: false
            }
        ])
    }

    const handleEditTask = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    editable: !task.editable
                };
            }
            return task;
        }));
    };

    const handleChangeTask = (value, taskId) => {
        setTasks(tasks.map((task) => {
            if(task.id === taskId) {
                return {
                    ...task,
                    text: value
                }
            }
            else {
                return task
            }
        }))
    }


    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => {
            return task.id !== taskId
        }))
    }

    return (
        <>
          <h1>Prague itinerary</h1>
          <AddTask onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onChangeTask={handleChangeTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </>
      );
}

function AddTask({onAddTask}) {
    const [text, setText] = useState('')
    return (
        <div>
            <input
                placeholder='Add Task'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => onAddTask(text)}>Add!</button>
        </div>
    )
}

function TaskList({tasks, onChangeTask, onEditTask, onDeleteTask}) {
    return (
        <div>
            <ul>
                {
                    tasks.map((task) => {
                        return <li key={task.id}>
                            <input type='checkbox'/>
                            {
                                task.editable ? (
                                    <input
                                        value={task.text}
                                        onChange={(e) => onChangeTask(e.target.value, task.id)}
                                        />
                                ) : (
                                    task.text
                                )
                            }
                            <button onClick={() => onEditTask(task.id)}>{task.editable ? 'Save' : 'Edit'}</button>
                            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

// Olay işleyicilerinin her biri durumu güncellemek için setTasks'ı çağırır. Bu bileşen büyüdükçe, içine serpiştirilmiş durum mantığı miktarı da artar. Bu karmaşıklığı azaltmak ve tüm mantığınızı erişimi kolay tek bir yerde tutmak için, bu durum mantığını bileşeninizin dışında "reducer" adı verilen tek bir işleve taşıyabilirsiniz.

// Redüktörler durumu işlemenin farklı bir yoludur. useState'ten useReducer'a üç adımda geçebilirsiniz:

// 1. Durum ayarlamadan eylem göndermeye geçin.
// 2. Bir reducer işlevi yazın.
// 3. Bileşeninizdeki redüktörü kullanın.


// Adım 1 : Durum Ayarlamadan Görevleri Göndermek

// Tüm durum ayarlama (setTasks) mantığını kaldırın. Geriye dört olay işleyicisi kalıyor.

// State'i reducer'larla yönetmek, doğrudan state'i ayarlamaktan biraz farklıdır. React'e state ayarlayarak "ne yapacağını" söylemek yerine, olay işleyicilerinizden "eylemler" göndererek "kullanıcının az önce ne yaptığını" belirtirsiniz. (Durum güncelleme mantığı başka bir yerde yaşayacaktır!) Dolayısıyla, bir olay işleyici aracılığıyla "görevleri ayarlamak" yerine, bir "görev eklendi/değiştirildi/silindi" eylemi gönderiyorsunuz. Bu, kullanıcının amacını daha iyi açıklar.
 
// function handleAddTask() {
//     dispatch({
//         type: 'added',
//         id: nextId++,
//         text: text,
//     })
// }

// function handleEditTask() {
//     dispatch({
//         type: 'edited',
//         task: task,
//     })
// }

// function handleSaveTask() {
//     dispatch({
//         type: 'saved',
//         task: task,
//     })
// }

// function handleDeleteTask() {
//     dispatch({
//         type: 'deleted',
//         id: taskId
//     })
// }

// Dispatch içinde gönderdiğiniz nesneye 'action' denir. Normal bir JavaScript nesnesidir. İçine ne koyacağınıza siz karar verirsiniz, ancak genellikle ne olduğu hakkında minimum bilgi içermelidir. (Dispatch işlevinin kendisini daha sonraki bir adımda ekleyeceksiniz).


// Adım 2 : Reducer Fonksiyonunu Tanımlayın 
// Redüktör fonksiyonu, durum mantığınızı yerleştireceğiniz yerdir. Mevcut durum ve 'action' nesnesi olmak üzere iki argüman alır ve bir sonraki durumu döndürür:

// function yourReducer(state, action) {
//     return next state for React to set
// }

// React, state'i reducer'dan döndürdüğünüze ayarlayacaktır.

// Bu örnekte durum ayarlama mantığınızı olay işleyicilerinizden bir reducer'a taşımak için şunları yapacaksınız:

// Geçerli durumu (görevleri) ilk argüman olarak bildirin.
// Action nesnesini ikinci argüman olarak bildirin.
// Redüktörden (React'in durumu ayarlayacağı) bir sonraki durumu döndürün.

// İşte tüm durum ayarlama mantığı bir reducer fonksiyonuna taşınmıştır:

// function yourReducer(tasks, action) {
//     if(action.type === 'added') {
//         return [
//             ...tasks,
//             {
//                 id: action.id,
//                 text: action.text
//             }
//         ]
//     }
//     else if(action.type === 'edited') {
//         return ...
//     }
//     else if(action.type === 'deleted') {
//         return ...
//     }
// }

// Reducer işlevini durumu (görevleri) bir argüman olarak aldığından, bunu bileşeninizin dışında bildirebilirsiniz. Bu, girinti seviyesini azaltır ve kodunuzun okunmasını kolaylaştırabilir.

// Yukarıdaki kod if/else deyimlerini kullanır, ancak switch deyimlerini reducer fonksiyonu içinde kullanmak bir gelenektir. Sonuç aynıdır, ancak switch deyimlerini bir bakışta okumak daha kolay olabilir.

// Bu belgenin geri kalanında bunları bu şekilde kullanacağız.

// Farklı case'ler içinde bildirilen değişkenlerin birbiriyle çakışmaması için her case bloğunu { ve } küme parantezlerine sarmanızı öneririz. Ayrıca, bir case genellikle bir return ile bitmelidir. Geri dönmeyi unutursanız, kod bir sonraki duruma "düşer" ve bu da hatalara yol açabilir!


// Adım 3: Bileşeninizdeki Reducer'ı Kullanın
// useReducer Kancası iki bağımsız değişken alır:
// 1. Bir Reducer Fonksiyonu
// 2. Bir Başlangıç Durumu

// Ve Bunları 'Return' Eder:
// 'State' bilgisi içeren bir değer
// Bir 'dispatch' işlevi

function reducerFunc(tasks, action) {
    switch(action.type) {
        case 'add' : {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.newTask,
                    done: false,
                    editable: false
                }
            ]
        }
        case 'edit' : {
            return tasks.map((task) => {
                return tasks.map((task) =>
                task.id === action.id
                    ? { ...task, text: action.changedTask }
                    : task
            )})
        }
        case 'save' : {
            return tasks.map((task) =>
                task.id === action.id
                    ? { ...task, editable: !task.editable }
                    : task
        )}
        case 'delete' : {
            return tasks.filter((task) => task.id !== action.id);
        }
        default:
            throw new Error('Unknown action type');
    }
}

export function NewTaskApp() {
    const [tasks, dispatch] = useReducer(reducerFunc, initialTasks)

    const handleAddClick = (task) => {
        dispatch({
            type: 'add',
            id: nextId++,
            newTask: task,
        })
    }

    const handleEditTask = (newTask, taskId) => {
        dispatch({
            type: 'edit',
            changedTask: newTask,
            id: taskId
            
        })
    }

    const handleSaveTask = (taskId) => {
        dispatch({
            type: 'save',
            id: taskId
        })
    }

    const handleDeleteTask = (taskId) => {
        dispatch({
            type: 'delete',
            id: taskId
        })
    }

    return (
        <div>
            <h1>Task List</h1>
            <AddTaskNew
                onAddClick={handleAddClick}
            />
            <TaskListsNew
                tasks={tasks}
                onEditTask={handleEditTask}
                onSaveTask={handleSaveTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    )
}

function AddTaskNew({onAddClick}) {
    const [addTask, setAddTask] = useState('')
    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                placeholder='Add Task'
                value={addTask}
                onChange={(e) => setAddTask(e.target.value)}
            />
            <input
                type='submit'
                value='Add'
                onClick={() => onAddClick(addTask)}
                />
        </form>
        </>
    )
}

function TaskListsNew({tasks, onEditTask, onSaveTask, onDeleteTask}) {
    return (
        <>
        <ul>
            {
                tasks.map((task) => {
                    return (
                        <div key={task.id}>
                        <li>
                            <input type='checkbox' />
                            {
                                task.editable ? (
                                    <input
                                        value={task.text}
                                        onChange={(e) => onEditTask(e.target.value, task.id)}
                                    />
                                ) : (
                                    task.text
                                )
                            }
                            <button onClick={() => onSaveTask(task.id)}>{task.editable ? 'Save' : 'Edit'}</button>
                            <button onClick={() => onDeleteTask(task.id)}>Delete!</button>
                        </li>
                        </div>
                    )
                })
            }
        </ul>
        </>
    )
}


// 6. Context (Bağlam) ile Derinlemesine Veri Geçişi
// Genellikle, bir üst bileşenden bir alt bileşene prop'lar aracılığıyla bilgi aktarırsınız. Ancak, ortada birçok bileşenden geçirmeniz gerekiyorsa veya uygulamanızdaki birçok bileşen aynı bilgiye ihtiyaç duyuyorsa, prop'ları geçirmek ayrıntılı ve zahmetli hale gelebilir. Context, üst bileşenin bazı bilgileri, ne kadar derin olursa olsun, altındaki ağaçtaki herhangi bir bileşen için, açıkça prop'lar aracılığıyla iletmeden kullanılabilir hale getirmesini sağlar.

// Problem şudur : 
// Prop'ları iletmek, UI ağacınız üzerinden onu kullanan bileşenlere açıkça veri aktarmanın harika bir yoludur. Ancak bir prop'u ağacın derinliklerine aktarmanız gerektiğinde ya da birçok bileşen aynı prop'a ihtiyaç duyduğunda prop'ları aktarmak ayrıntılı ve zahmetli hale gelebilir. En yakın ortak ata, veriye ihtiyaç duyan bileşenlerden çok uzakta olabilir ve durumu bu kadar yükseğe çıkarmak "prop delme (prop drilling)" adı verilen bir duruma yol açabilir.

// useContext, işlevsel bir bileşen içinde bir bağlamı kullanmanıza olanak tanıyan bir React kancasıdır. Context, her seviyede prop'ları manuel olarak aktarmak zorunda kalmadan bileşen ağacından veri aktarmanın bir yolunu sağlar. Bu, özellikle belirli verilerin uygulamanızdaki farklı iç içe geçme seviyelerindeki birçok bileşen tarafından erişilebilir olması gerektiğinde kullanışlıdır.

export function Page() {
    return(
        <ThemeProvider>
            <h1>Lorem ipsum dolor sit.</h1>
            <div>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>
                        <Button>
                            Change Mode!
                        </Button>
                    </li>
                </ul>
            </div>
        </ThemeProvider>
    )
}


function Button({children}) {
    const [theme, changeMode] = useTheme()
    return(
        <button onClick={changeMode}>
            {children + ' ' + theme}
        </button>
    )
}

// Bağlam kullanmak çok caziptir! Ancak, bu aynı zamanda onu aşırı kullanmanın da çok kolay olduğu anlamına gelir. Bazı sahne malzemelerini birkaç seviye derine aktarmanız gerekiyor diye bu bilgileri bağlam içine yerleştirmeniz gerekmez.

// İşte bağlamı kullanmadan önce göz önünde bulundurmanız gereken birkaç alternatif:

// Propları geçirerek başlayın. Bileşenleriniz önemsiz değilse, bir düzine prop'u bir düzine bileşenden geçirmek alışılmadık bir durum değildir. Zor gibi gelebilir, ancak hangi bileşenin hangi veriyi kullandığını çok açık hale getirir! Kodunuzun bakımını yapan kişi, veri akışını prop'larla açık hale getirdiğiniz için memnun olacaktır.

// Bileşenleri ayıklayın ve JSX'i onlara alt bileşen olarak aktarın. Bazı verileri, bu verileri kullanmayan (ve yalnızca daha aşağıya aktaran) birçok ara bileşen katmanından geçirirseniz, bu genellikle yol boyunca bazı bileşenleri çıkarmayı unuttuğunuz anlamına gelir. Örneğin, gönderiler gibi veri desteklerini bunları doğrudan kullanmayan görsel bileşenlere aktarıyor olabilirsiniz, örneğin <Layout posts={posts} />. Bunun yerine, Layout'un çocukları bir prop olarak almasını sağlayın ve <Layout><Posts posts={posts} /></Layout>. Bu, veriyi belirten bileşen ile veriye ihtiyaç duyan bileşen arasındaki katman sayısını azaltır.

// Bu yaklaşımlardan hiçbiri sizin için uygun değilse, bağlamı göz önünde bulundurun.

// Context için kullanım durumları

// Temalandırma: Uygulamanız kullanıcının görünümünü değiştirmesine izin veriyorsa (örn. karanlık mod), uygulamanızın en üstüne bir bağlam sağlayıcı koyabilir ve bu bağlamı görsel görünümlerini ayarlaması gereken bileşenlerde kullanabilirsiniz.

// Geçerli hesap: Birçok bileşenin o anda oturum açmış olan kullanıcıyı bilmesi gerekebilir. Bunu bir bağlama yerleştirmek, ağacın herhangi bir yerinde okumayı kolaylaştırır. Bazı uygulamalar aynı anda birden fazla hesabı çalıştırmanıza da izin verir (örneğin, farklı bir kullanıcı olarak yorum bırakmak için). Bu gibi durumlarda, kullanıcı arayüzünün bir kısmını farklı bir geçerli hesap değerine sahip iç içe geçmiş bir sağlayıcıya sarmak uygun olabilir.

// Yönlendirme: Çoğu yönlendirme çözümü, geçerli rotayı tutmak için dahili olarak bağlam kullanır. Her bağlantı aktif olup olmadığını bu şekilde "bilir". Eğer kendi yönlendiricinizi oluşturuyorsanız, siz de bunu yapmak isteyebilirsiniz.

// Durumu yönetme: Uygulamanız büyüdükçe, uygulamanızın tepesine yakın çok fazla durumla karşılaşabilirsiniz. Aşağıdaki birçok uzak bileşen bunu değiştirmek isteyebilir. Karmaşık state'i yönetmek ve çok fazla güçlük çekmeden uzak bileşenlere aktarmak için context ile birlikte bir reducer kullanmak yaygındır.