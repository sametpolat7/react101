import { useState } from "react";

// Describing The UI

// 1. Components

// React, kullanıcı arayüzleri (UI) oluşturmak için kullanılan bir JavaScript kütüphanesidir. Kullanıcı arayüzü düğmeler, metinler ve resimler gibi küçük birimlerden oluşur. React bunları yeniden kullanılabilir, iç içe yerleştirilebilir bileşenler halinde birleştirmenizi sağlar. Web sitelerinden telefon uygulamalarına kadar ekrandaki her şey bileşenlere ayrılabilir.Bileşenler bir düğme kadar küçük veya tüm bir sayfa kadar büyük olabilir.

// React bileşenleri normal JavaScript fonksiyonlarıdır, ancak adları büyük harfle başlamalıdır, aksi takdirde çalışmazlar!

export function Profile() {
    return (
        <img
        src="https://picsum.photos/200/300"
        alt="Random" />
    )
}
// React, uygulamanız için bileşenler, yeniden kullanılabilir UI öğeleri oluşturmanıza olanak tanır.
// Bir React uygulamasında, her kullanıcı arayüzü parçası bir bileşendir.
// React bileşenleri, normal JavaScript fonksiyonlarıdır:
// İsimleri her zaman büyük harfle başlar.
// JSX işaretlemesi döndürürler.


// 2. Import Export

// Bileşenlerin büyüsü yeniden kullanılabilir olmalarında yatar: başka bileşenlerden oluşan bileşenler oluşturabilirsiniz. Ancak giderek daha fazla bileşeni iç içe yerleştirdikçe, bunları farklı dosyalara bölmeye başlamak genellikle mantıklıdır. Bu, dosyalarınızın kolay taranmasını ve bileşenleri daha fazla yerde yeniden kullanmanızı sağlar.


// 3. JSX

// JSX, bir JavaScript dosyası içinde HTML benzeri işaretleme yazmanıza olanak tanıyan bir JavaScript sözdizimi uzantısıdır. Bileşen yazmanın başka yolları olsa da, çoğu React geliştiricisi JSX'in kısalığını tercih eder ve çoğu kod tabanı bunu kullanır.

// Web; HTML, CSS ve JavaScript üzerine inşa edilmiştir. Uzun yıllar boyunca web geliştiricileri içeriği HTML'de, tasarımı CSS'de ve mantığı JavaScript'te -genellikle ayrı dosyalarda- tuttu! İçerik HTML içinde işaretlenirken, sayfanın mantığı JavaScript'te ayrı olarak yaşıyordu. Ancak Web daha etkileşimli hale geldikçe, mantık içeriği giderek daha fazla belirledi. JavaScript HTML'den sorumluydu! Bu nedenle React'te işleme mantığı ve biçimlendirme aynı yerde (bileşenler) birlikte yaşar.

// Bir düğmenin işleme mantığını ve biçimlendirmesini bir arada tutmak, her düzenlemede birbirleriyle senkronize kalmalarını sağlar. Tersine, düğmenin biçimlendirmesi ve kenar çubuğunun biçimlendirmesi gibi birbiriyle ilgisi olmayan ayrıntılar birbirinden izole edilir ve bu da herhangi birinin kendi başına değiştirilmesini daha güvenli hale getirir.

// JSX bir bileşenden birden fazla öğe döndürmek istediğinizde bunları tek bir üst etikete sarmanızı ister. Bu bir <div> etiketi de olabilir bir fragment (<></>) da olabilir.

// Neden sarmalıyız?
// JSX HTML gibi görünür, ancak kaputun altında düz JavaScript nesnelerine dönüştürülür. İki nesne nasıl ki bir diziye sarmadan döndürelemez ise, iki JSX etiketi de başka bir etikete veya bir Fragment'e sarmadan döndürülemez.

// JSX etiketlerin açıkça kapatılmasını gerektirir: <img> gibi kendi kendini kapatan etiketler <img /> olmalı ve <li>oranges gibi sarmalayan etiketler <li>oranges</li> olarak yazılmalıdır.

// JSX, işleme mantığını ve içeriği aynı yerde tutarak bir JavaScript dosyası içinde HTML benzeri biçimlendirme yazmanıza olanak tanır. Bazen bu işaretlemenin içine küçük bir JavaScript mantığı eklemek veya dinamik bir özelliğe başvurmak isteyebilirsiniz. Bu durumda, JavaScript'e bir pencere açmak için JSX'inizde küme parantezleri kullanabilirsiniz.

export function Avatar() {
    const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
    return(
        <img
        className="avatar"
        src={avatar}
        alt="Avatar"
        style={
            {border: '2px solid black'}
        }
        />
    )
}

// Görüntüyü yuvarlak hale getiren "avatar" CSS sınıf adını belirten className="avatar" ile avatar adlı JavaScript değişkeninin değerini okuyan src={avatar} arasındaki farka dikkat edin. Bunun nedeni, küme parantezlerinin JavaScript ile doğrudan biçimlendirmenizde çalışmanıza olanak sağlamasıdır!

// JSX içinde küme parantezlerini yalnızca iki şekilde kullanabilirsiniz:

// Doğrudan bir JSX etiketinin içinde metin olarak: 
// <h1>{name}'s To Do List</h1> çalışır, ancak <{tag}>Gregorio Y. Zara's To Do List</{tag}> çalışmaz.
// = işaretinin hemen ardından gelen properties olarak: src={avatar} avatar değişkenini okuyacaktır, ancak src="{avatar}" "{avatar}" dizesini geçirecektir.

// Dizeler, sayılar ve diğer JavaScript ifadelerine ek olarak, JSX'te nesneleri bile aktarabilirsiniz. Nesneler de küme parantezleriyle gösterilir, örneğin { name: "Hedy Lamarr", inventions: 5 }. Bu nedenle, JSX'te bir JS nesnesi geçirmek için, nesneyi başka bir çift küme parantezi içine sarmalısınız: person={{ name: "Hedy Lamarr", inventions: 5 }}.

// Bunu JSX'te satır içi CSS stilleri ile görebilirsiniz. React, satır içi stilleri kullanmanızı gerektirmez (CSS sınıfları çoğu durumda harika çalışır). Ancak satır içi bir stile ihtiyacınız olduğunda, style niteliğine bir nesne geçirirsiniz: Line 51.

// Bir dahaki sefere JSX'te {{ ve }} gördüğünüzde, bunun JSX kıvrımları içindeki bir nesneden başka bir şey olmadığını bilin!


// 4. Props

// React bileşenleri birbirleriyle iletişim kurmak için prop'ları kullanır. Her ana bileşen, alt bileşenlerine prop'lar vererek onlara bazı bilgiler aktarabilir. Prop'lar size HTML niteliklerini hatırlatabilir, ancak nesneler, diziler ve fonksiyonlar dahil olmak üzere herhangi bir JavaScript değerini bunlar aracılığıyla iletebilirsiniz.

// Bir <img> etiketine aktarabileceğiniz prop'lar (Line 43) önceden tanımlanmıştır (ReactDOM HTML standardına uygundur). Ancak, <Avatar> gibi kendi bileşenlerinize, onları özelleştirmek için herhangi bir prop geçirebilirsiniz. İşte nasıl yapacağınız!

export function Employees() {
    return(
        <>
            <Employee
            person={{name: "Winghun Enrich", imgId: "YfeOqp2s"}}
            />
            <Employee
            person={{name: "Engri Cekici", imgId: "OKS67lhs"}}
            />
            <Employee
            person={{name: "Lamine Yalla", imgId: "1bX5QH6s"}}
            />
        </>
    )
}

function Employee({person, size = 100}) {
    return (
        <img
        className="avatar"
        src={`https://i.imgur.com/${person.imgId}.jpg`}
        alt="Avatar"
        width={size}
        height={size}
        />
    )
}

// Prop'ları ayarlayabileceğiniz "düğmeler" gibi düşünebilirsiniz. Fonksiyonlar için argümanlarla aynı rolü üstlenirler - aslında, props bileşeninizin tek argümanıdır! React bileşen fonksiyonları tek bir argüman, bir props nesnesi kabul eder:

// React'te JSX etiketleri içine içerik yerleştirmek, bu içeriği otomatik olarak üst bileşene children prop olarak aktarır. Ana bileşen daha sonra kendi JSX yapısı içindeki children prop'u kullanarak çocuklarına erişebilir ve onları oluşturabilir.

export function Card({children}) {
    return(
        <div className="card">
            {children}
        </div>
    )
}

export function Children() {
    return(
        <p>Hello World!</p>
    )
}

// Proplar, bir bileşenin verilerini yalnızca başlangıçta değil, zamanın herhangi bir noktasında yansıtır. Ancak prop'lar değişmezdir - bilgisayar biliminde "değiştirilemez" anlamına gelen bir terim. Bir bileşenin prop'larını değiştirmesi gerektiğinde (örneğin, bir kullanıcı etkileşimine veya yeni verilere yanıt olarak), üst bileşeninden kendisine farklı prop'lar (yeni bir nesne) iletmesini "istemesi" gerekecektir! Daha sonra eski sahne bir kenara atılacak ve sonunda JavaScript motoru bunlar tarafından kullanılan belleği geri alacaktır. "Propları değiştirmeye" çalışmayın. Kullanıcı girdisine yanıt vermeniz gerektiğinde (seçilen rengi değiştirmek gibi), useState kullanılır:

export function ParentComponent() {
    const [userName, setUserName] = useState("Guest!")
    return(
        <div>
            <ChildComponent
            name={userName}
            />
            <button onClick={() => {setUserName("Samet!")}}>Login</button>
        </div>
    )
}

function ChildComponent({name}) {
    return(
        <h1>Hello {name}</h1>
    )
}


// 5. Conditional Rendering
// Bileşenlerinizin genellikle farklı koşullara bağlı olarak farklı şeyler göstermesi gerekecektir. React'te if deyimleri, && ve ? : operatörleri gibi JavaScript sözdizimlerini kullanarak JSX'i koşullu olarak oluşturabilirsiniz.

export function PackingList() {
    return(
        <section>
            <h1>Polat's Packing List with if operator</h1>
            <ul>
                <Item
                name="Laptop Desk"
                isPacked={true}
                />
                <Item
                name="Bicycle"
                isPacked={true}
                />
                <Item
                name="Plates"
                isPacked={false}
                />
            </ul>
            <h1>Polat's Packing List with ternary operator</h1>
            <ul>
                <Item1
                name="Laptop Desk"
                isPacked={true}
                />
                <Item1
                name="Bicycle"
                isPacked={true}
                />
                <Item1
                name="Plates"
                isPacked={false}
                />
            </ul>
            <h1>Polat's Packing List with AND operator</h1>
            <ul>
                <Item2
                name="Laptop Desk"
                isPacked={true}
                />
                <Item2
                name="Bicycle"
                isPacked={true}
                />
                <Item2
                name="Plates"
                isPacked={false}
                />
            </ul>
        </section>
    )
}

function Item({name, isPacked}) {
    if(isPacked){
        return <li>{name} ✔</li>
        // Bazı durumlarda hiçbir şey görüntülemek istemezsiniz. Örneğin, paketlenmiş öğeleri hiç göstermek istemediğinizi varsayalım. Bir bileşen bir şey döndürmelidir. Bu durumda null değerini döndürebilirsiniz:
        // return null;
    }
    return <li>{name}</li>
}

//Pratikte, bir bileşenden null döndürmek yaygın değildir çünkü bu, bileşeni oluşturmaya çalışan bir geliştiriciyi şaşırtabilir. Daha sık olarak, bileşeni üst bileşenin JSX'ine koşullu olarak dahil eder veya hariç tutarsınız.Önceki örnekte, bileşen tarafından hangi (varsa!) JSX ağacının döndürüleceğini kontrol ettiniz. Render çıktısında bazı yinelemeler olduğunu fark etmiş olabilirsiniz. Koşullu dalların her ikisi de <li className="item">...</li> döndürür. Bu tekrarlama zararlı olmasa da kodunuzun bakımını zorlaştırabilir. Ya className'i değiştirmek isterseniz? Bunu kodunuzda iki yerde yapmanız gerekir! Böyle bir durumda, kodunuzu daha DRY hale getirmek için koşullu olarak küçük bir JSX ekleyebilirsiniz.

// <li className="list">
//    {isPacked ? name + '✔' : name}
// </li>

// Nesne yönelimli bir programlama geçmişinden geliyorsanız, yukarıdaki iki örneğin birbirinden farklı olduğunu düşünebilirsiniz çünkü bunlardan biri iki farklı <li> "örneği" oluşturabilir. Ancak JSX öğeleri "örnek" değildir çünkü herhangi bir dahili durum tutmazlar ve gerçek DOM düğümleri değildirler. Bunlar, planlar gibi hafif tanımlamalardır. Yani bu iki örnek aslında tamamen eşdeğerdir.

function Item1({isPacked, name}) {
    return(
        <li>
            {isPacked ? (
                <del>
                    {name}
                </del>
            ) : (
                name
            )}
        </li>
    )
}

// Karşılaşacağınız bir diğer yaygın kısayol ise JavaScript mantıksal AND (&&) operatörüdür. React bileşenlerinin içinde, genellikle koşul doğru olduğunda bazı JSX'leri işlemek veya aksi takdirde hiçbir şey işlememek istediğinizde ortaya çıkar. && ile, onay işaretini yalnızca isPacked true ise koşullu olarak oluşturabilirsiniz:

function Item2({isPacked, name}) {
    return(
        <li>
            {name} {isPacked && '✔'}
        </li>
    )
}

// &&'nin sol tarafına sayı koymayın.

// JavaScript, koşulu test etmek için sol tarafı otomatik olarak boolean'a dönüştürür. Ancak, sol taraf 0 ise, tüm ifade bu değeri (0) alır ve React hiçbir şey yerine 0'ı mutlu bir şekilde işler.

// Örneğin, yaygın bir hata messageCount && <p>New messages</p> gibi bir kod yazmaktır. messageCount 0 olduğunda hiçbir şey oluşturmadığını varsaymak kolaydır, ancak gerçekten 0'ın kendisini oluşturur!

// Düzeltmek için sol tarafı boolean yapın: messageCount > 0 && <p>New messages</p>.


// 6. Rendering List
// Genellikle bir veri koleksiyonundan birden fazla benzer bileşeni görüntülemek istersiniz. Bir veri dizisini işlemek için JavaScript dizi yöntemlerini kullanabilirsiniz. Bu sayfada, veri dizinizi filtrelemek ve bir bileşen dizisine dönüştürmek için React ile filter() ve map() yöntemlerini kullanacaksınız.

// Varsayalım ki elimizde şöyle bir liste var:
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>

// Bu liste öğeleri arasındaki tek fark içerikleri, yani verileridir. Arayüzler oluştururken genellikle farklı veriler kullanarak aynı bileşenin birkaç örneğini göstermeniz gerekecektir: yorum listelerinden profil resimleri galerilerine kadar. Bu gibi durumlarda, bu verileri JavaScript nesnelerinde ve dizilerinde saklayabilir ve bunlardan bileşen listeleri oluşturmak için map() ve filter() gibi yöntemleri kullanabilirsiniz.

// Diyelim ki yalnızca mesleği 'kimyager' olan kişileri göstermenin bir yolunu istiyorsunuz. Yalnızca bu kişileri döndürmek için JavaScript'in filter() yöntemini kullanabilirsiniz. Bu yöntem bir öğe dizisi alır, bunları bir "test "ten (true veya false döndüren bir işlev) geçirir ve yalnızca testi geçen (true döndüren) öğelerden oluşan yeni bir dizi döndürür.

const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'spaceflight calculations',
    imageId: 'MK3eW3A'
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'discovery of Arctic ozone hole',
    imageId: 'mynHUSa'
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'electromagnetism theory',
    imageId: 'bE7W1ji'
  }, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
    imageId: 'IOjWm71'
  }, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
    accomplishment: 'white dwarf star mass calculations',
    imageId: 'lrWQx8l'
  }];

export function List() {
    const chemistList = people.filter(item => 
        item.profession === 'chemist'
    )

    const list = chemistList.map((item) => {
        return (
            <li key={item.id}>
                <img 
                src={`https://i.imgur.com/${item.imageId}s.jpg`}
                alt={item.name}
                />
                <p>
                    <b>{item.name}</b>
                    <br />
                    <i>{item.profession}</i>
                    <br />
                    {item.accomplishment}
                </p>
            </li>
        )
    })

    return <ul>{list}</ul>
}

// Yukarıda örneğin çalıştığına ancak console'a bir hata yazdırdığına dikkat edin. 
// Her dizi öğesine bir anahtar vermeniz gerekir - bu, dizideki diğer öğeler arasında onu benzersiz bir şekilde tanımlayan bir dize veya sayıdır:

// Anahtarlar, React'e her bileşenin hangi dizi öğesine karşılık geldiğini söyler, böylece daha sonra bunları eşleştirebilir. Bu, dizi öğeleriniz hareket edebiliyorsa (örneğin sıralama nedeniyle), ekleniyorsa veya siliniyorsa önemli hale gelir. İyi seçilmiş bir anahtar, React'in tam olarak ne olduğunu çıkarmasına ve DOM ağacında doğru güncellemeleri yapmasına yardımcı olur. Anında anahtar oluşturmak yerine, bunları verilerinize dahil etmelisiniz!

// Anahtarınızı nereden alabilirsiniz?
// Bir veritabanından gelen veriler: Verileriniz bir veritabanından geliyorsa, doğası gereği benzersiz olan veritabanı anahtarlarını/ID'lerini kullanabilirsiniz.

// Yerel olarak oluşturulan veriler: Verileriniz yerel olarak oluşturuluyor ve kalıcı hale getiriliyorsa (örneğin bir not alma uygulamasındaki notlar), öğeleri oluştururken artan bir sayaç, crypto.randomUUID() veya uuid gibi bir paket kullanın.

// Anahtar kuralları
// Anahtarlar kardeşler arasında benzersiz olmalıdır. Ancak, farklı dizilerdeki JSX düğümleri için aynı anahtarları kullanmakta bir sakınca yoktur.
// Anahtarlar değişmemelidir, aksi takdirde amaçlarını yitirirler! Render sırasında bunları oluşturmayın.

// React neden anahtarlara ihtiyaç duyar?
// Masaüstünüzdeki dosyaların isimlerinin olmadığını hayal edin. Bunun yerine, onları sıralarına göre adlandırırdınız - ilk dosya, ikinci dosya ve bu şekilde devam ederdi. Buna alışabilirsiniz, ancak bir dosyayı sildiğinizde, kafa karıştırıcı olur. İkinci dosya ilk dosya olur, üçüncü dosya ikinci dosya olur ve bu böyle devam ederdi.

// Bir klasördeki dosya adları ve bir dizideki JSX anahtarları benzer bir amaca hizmet eder. Bir öğeyi kardeşleri arasında benzersiz bir şekilde tanımlamamızı sağlarlar. İyi seçilmiş bir anahtar, dizi içindeki konumdan daha fazla bilgi sağlar. Yeniden sıralama nedeniyle konum değişse bile, anahtar React'in öğeyi yaşam süresi boyunca tanımlamasını sağlar.

// Bir öğenin dizideki indeksini anahtar olarak kullanmak cazip gelebilir. Aslında, bir anahtar belirtmezseniz React'in kullanacağı şey budur. Ancak bir öğe eklendiğinde, silindiğinde veya dizi yeniden sıralandığında öğeleri oluşturma sıranız zaman içinde değişecektir. Anahtar olarak dizin genellikle ince ve kafa karıştırıcı hatalara yol açar.

// Benzer şekilde, key={Math.random()} gibi anahtarları anında oluşturmayın. Bu, anahtarların render işlemleri arasında asla eşleşmemesine neden olur ve tüm bileşenlerinizin ve DOM'un her seferinde yeniden oluşturulmasına yol açar. Bu sadece yavaş olmakla kalmaz, aynı zamanda liste öğelerinin içindeki kullanıcı girdilerini de kaybeder. Bunun yerine, verilere dayalı sabit bir ID kullanın.

// Bileşenlerinizin anahtarı bir prop olarak almayacağını unutmayın. Sadece React'in kendisi tarafından ipucu olarak kullanılır. Bileşeninizin bir ID'ye ihtiyacı varsa, bunu ayrı bir prop olarak iletmelisiniz: <Profil key={id} userId={id} />.

const recipes = [{
    id: 'greek-salad',
    name: 'Greek Salad',
    ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
  }, {
    id: 'hawaiian-pizza',
    name: 'Hawaiian Pizza',
    ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
  }, {
    id: 'hummus',
    name: 'Hummus',
    ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
  }];

export function RecipeList() {
    return (
      <div>
        <h1>Recipes</h1>
        {
            recipes.map(recipe =>
                <Recipe {...recipe} key={recipe.id}/> // Her bir objeyi anahtar-değer çiftleri ile birlikle prop olarak spread edecek.
            )
        }
      </div>
    );
  }

function Recipe({id, name, ingredients}) {
    return(
        <div>
            <h2>{name}</h2>
            <ul>
                {
                    ingredients.map((ingredient) => 
                        <li key={ingredient}>{ingredient}</li>
                    )
                }
            </ul>
        </div>
    )
}

// 7. Keeping Components Pure
// Bazı JavaScript fonksiyonları saftır. Saf fonksiyonlar yalnızca bir hesaplama yapar, başka bir şey yapmaz. Bileşenlerinizi kesinlikle yalnızca saf fonksiyonlar olarak yazarak, kod tabanınız büyüdükçe şaşırtıcı hatalardan ve öngörülemeyen davranışlardan kaçınabilirsiniz. Ancak bu avantajları elde etmek için uymanız gereken birkaç kural vardır.

// Bilgisayar biliminde (ve özellikle fonksiyonel programlama dünyasında), saf fonksiyon aşağıdaki özelliklere sahip bir fonksiyondur:

// Kendi işine bakar. Çağrılmadan önce var olan hiçbir nesneyi veya değişkeni değiştirmez.
//Aynı girdiler, aynı çıktılar. Aynı girdiler verildiğinde, saf bir fonksiyon her zaman aynı sonucu döndürmelidir.

// function double(number) {
//     return number * 2;
// }

// Yukarıdaki örnekte, double saf bir fonksiyondur. Eğer 3 verirseniz, 6 döndürecektir. Her zaman.

// React bu konsept etrafında tasarlanmıştır. React, yazdığınız her bileşenin saf bir fonksiyon olduğunu varsayar. Bu, yazdığınız React bileşenlerinin aynı girdiler verildiğinde her zaman aynı JSX'i döndürmesi gerektiği anlamına gelir:

export function Recipes({drinkers}) {
    return(
        <ol>
            <li>Boil {drinkers} cups of water.</li>
            <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
            <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
        </ol>
    )
}

// Tarif'e drinkers={2} verdiğinizde, 2 bardak su içeren JSX döndürecektir. Her zaman.
// Eğer drinkers={6} geçerseniz, 6 bardak su içeren JSX döndürecektir. Her zaman.

// Tıpkı bir matematik formülü gibi.

// React'in render işlemi her zaman saf olmalıdır. Bileşenler yalnızca JSX'lerini döndürmeli ve render işleminden önce var olan herhangi bir nesneyi veya değişkeni değiştirmemelidir.

let guest = 0

function Cup() {
    guest += 1;
    return (
        <h2>Tea cup for guest #{guest}</h2>
    )
}

export function TeaSet() {
    return (
      <>
        <Cup />
        <Cup />
        <Cup />
      </>
    );
  }

// Bu bileşen, kendi dışında bildirilen bir misafir değişkeni okumakta ve yazmaktadır. Bu, bu bileşenin birden çok kez çağrılmasının farklı JSX üreteceği anlamına gelir! Dahası, diğer bileşenler guest'i okursa, ne zaman işlendiklerine bağlı olarak farklı JSX'ler de üreteceklerdir! Bu öngörülebilir değildir.

// Çıktının beklenilenden farklı sonuç vermesinin sebebi sebebi <App01 /> component'inin <React.StrictMode /> içinde çalıştırılmasıdır.Strict Mode, bileşen işlevlerini iki kez çağırarak bu kuralları ihlal eden bileşenleri bulmaya yardımcı olur.

export function TeaSet02() {
    return (
        <>
        <Cup02 drinkers={1} />
        <Cup02 drinkers={2} />
        <Cup02 drinkers={3} />
        </>
    )
}

function Cup02({drinkers}) {
    return(
        <h2>Tea cup for guest #{drinkers}</h2>
    )
}

// Orijinal örneğin "Guest #1", "Guest #2" ve "Guest #3" yerine nasıl "Guest #2", "Guest #4" ve "Guest #6" gösterdiğine dikkat edin. Orijinal fonksiyon saf değildi, bu yüzden iki kez çağrılması fonksiyonu bozdu. Ancak düzeltilmiş saf sürüm, işlev her seferinde iki kez çağrılsa bile çalışır. Saf fonksiyonlar sadece hesaplama yapar, bu yüzden onları iki kez çağırmak hiçbir şeyi değiştirmez-tıpkı double(2)'yi iki kez çağırmanın döndürüleni değiştirmemesi ve y = 2x'i iki kez çözmenin y'nin ne olduğunu değiştirmemesi gibi. Aynı girdiler, aynı çıktılar. Her zaman.

// Sıkı Modun üretimde bir etkisi yoktur, bu nedenle kullanıcılarınız için uygulamayı yavaşlatmaz. Sıkı Mod'u tercih etmek için kök bileşeninizi <React.StrictMode> içine sarabilirsiniz. Bazı frameworkler bunu varsayılan olarak yapar.

// Yukarıdaki örnekte sorun, bileşenin render sırasında önceden var olan bir değişkeni değiştirmesiydi. Kulağa biraz daha korkutucu gelmesi için bu durum genellikle "mutasyon" olarak adlandırılır. Saf fonksiyonlar, fonksiyonun kapsamı dışındaki değişkenleri veya çağrıdan önce oluşturulmuş nesneleri değiştirmez.

// Ancak, render sırasında yeni oluşturduğunuz değişkenleri ve nesneleri değiştirmenizde hiçbir sakınca yoktur. Bu örnekte, bir [] dizisi oluşturuyor, bunu bir bardak değişkenine atıyor ve ardından içine bir düzine bardak yerleştiriyorsunuz:

export function TeaGathering() {
    const teaTable = [];
    for(let i = 1; i <= 12; i++){
        teaTable.push(<Cups03 key={i} guest={i} />)
    }
    return teaTable;
}

function Cups03({guest}) {
    return <h2>Tea cup for guest #{guest}</h2>
}

// Eğer bardak değişkeni veya [] dizisi TeaGathering fonksiyonunun dışında oluşturulsaydı, bu büyük bir sorun olurdu! Öğeleri bu diziye iterek önceden var olan bir nesneyi değiştiriyor olurdunuz.

// Ancak, sorun değil çünkü bunları aynı render sırasında, TeaGathering içinde oluşturdunuz. TeaGathering dışındaki hiçbir kod bunun gerçekleştiğini bilmeyecektir. Buna "yerel mutasyon" denir - bileşeninizin küçük sırrı gibidir.

export function Counter() {
    const [count, setCount] = useState(0);
  
    function increment() {
      // Use setState to update count instead of directly modifying it
      setCount(prevCount => prevCount + 1);
    }
  
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }

//   Artış fonksiyonunda, sayım durumunu güncellemek için useState kancası tarafından sağlanan setCount fonksiyonunu kullanıyoruz. Bu, React'in durum değişikliğinden düzgün bir şekilde haberdar olmasını sağlayarak yeniden oluşturmaları tetiklemesine ve bileşenin UI durumunu doğru bir şekilde korumasına olanak tanır. React'in tercih ettiği durum yönetimi yaklaşımını kullanarak, yerel mutasyondan kaçınıyor ve React'in öngörülebilir ve verimli işleme ilkelerine bağlı kalıyoruz.

// Fonksiyonel programlama büyük ölçüde saflığa dayansa da, bir noktada, bir yerde, bir şeylerin değişmesi gerekir. Programlamanın amacı da bu zaten! Bu değişikliklere -ekranı güncellemek, bir animasyon başlatmak, verileri değiştirmek- yan etkiler denir. Bunlar render sırasında değil, "yan tarafta" gerçekleşen şeylerdir.

// React'te yan etkiler genellikle olay işleyicilerinin içine aittir. Olay işleyicileri, bir eylem gerçekleştirdiğinizde (örneğin, bir düğmeye tıkladığınızda) React'in çalıştırdığı işlevlerdir. Olay işleyicileri bileşeninizin içinde tanımlanmış olsalar bile, render sırasında çalışmazlar! Yani olay yöneticilerinin saf olması gerekmez.

// Diğer tüm seçenekleri tükettiyseniz ve yan etkiniz için doğru olay işleyicisini bulamıyorsanız, bileşeninizde bir useEffect çağrısı ile dönen JSX'inize ekleyebilirsiniz. Bu, React'e daha sonra, render işleminden sonra, yan etkilere izin verildiğinde çalıştırmasını söyler. Ancak bu yaklaşım son çare olmalıdır.

// Mümkün olduğunda, mantığınızı yalnızca render ile ifade etmeye çalışın. Bunun sizi ne kadar ileriye götürebileceğine şaşıracaksınız!

// Bir React bileşeninde mantığın JSX içinde mi yoksa dışında mı bildirileceğine karar vermek, mantığın karmaşıklığı, okunabilirlik, sürdürülebilirlik ve yeniden kullanılabilirlik gibi çeşitli faktörlere bağlıdır. Bileşen mantığınızı nerede bildireceğinizi belirlemenize yardımcı olacak bazı yönergeleri burada bulabilirsiniz:

// 1. Mantığın Karmaşıklığı: Mantık basitse ve doğrudan UI öğelerinin işlenmesiyle ilgiliyse, bunu doğrudan JSX içinde bildirmek genellikle iyidir.

// 2. Okunabilirlik ve Sürdürülebilirlik: Mantığı ayrı bir fonksiyona çıkarmak okunabilirliği artırıyor ve kodun anlaşılmasını kolaylaştırıyorsa, bunu JSX dışında tanımlamak daha iyidir.

// 3. Yeniden kullanılabilirlik: Mantığın birden fazla bileşende veya aynı bileşen içinde yeniden kullanılması gerekiyorsa, bunu JSX dışında ayrı bir işlev veya kancada tanımlamayı düşünün.

// 4. Performansla İlgili Hususlar: Bazı durumlarda, performansın optimize edilmesi verilerin önceden hesaplanmasını veya gereksiz hesaplamalardan kaçınılmasını gerektirebilir. Bu gibi durumlarda, verileri JSX dışında hesaplamak ve önceden hesaplanmış değerleri bileşenlere prop olarak iletmek faydalı olabilir.

// Saf fonksiyonlar her zaman aynı sonuçları döndürür, bu nedenle önbelleğe alınmaları güvenlidir.
// Derin bir bileşen ağacını render etmenin ortasında bazı veriler değişirse, React eski render işlemini bitirmek için zaman kaybetmeden render işlemini yeniden başlatabilir. Saflık, hesaplamayı herhangi bir zamanda durdurmayı güvenli hale getirir.

// Özetle:

// Render işlemi herhangi bir zamanda gerçekleşebilir, bu nedenle bileşenler birbirlerinin render sırasına bağlı olmamalıdır.
// Bileşenlerinizin render için kullandığı girdilerin hiçbirini mutasyona uğratmamalısınız. Buna prop'lar, durum ve bağlam da dahildir. Ekranı güncellemek için, önceden var olan nesneleri değiştirmek yerine durumu "ayarlayın".
// Bileşeninizin mantığını döndürdüğünüz JSX'te ifade etmeye çalışın. "Bir şeyleri değiştirmeniz" gerektiğinde, bunu genellikle bir olay işleyicisinde yapmak istersiniz. Son çare olarakEffect kullanabilirsiniz.
// Saf fonksiyonlar yazmak biraz pratik gerektirir, ancak React'in paradigmasının gücünü ortaya çıkarır.

// Not: React'in bileşen fonksiyonlarının belirli bir sırada çalışacağını garanti etmediğini unutmayın, bu nedenle değişkenleri ayarlayarak aralarında iletişim kuramazsınız. Tüm iletişim prop'lar aracılığıyla gerçekleşmelidir.



// 8. Understanding Your UI as a Tree

// React uygulamanız birçok bileşenin iç içe geçmesiyle şekilleniyor. React uygulamanızın bileşen yapısını nasıl takip ediyor? React ve diğer birçok UI kütüphanesi, UI'yi bir ağaç olarak modeller. Uygulamanızı bir ağaç olarak düşünmek, bileşenler arasındaki ilişkiyi anlamak için kullanışlıdır. Bu anlayış, performans ve durum yönetimi gibi gelecekteki kavramlarda hata ayıklamanıza yardımcı olacaktır.

// React'te, bileşen ağacı veya sanal DOM ağacı olarak da bilinen UI ağacı, uygulamanızın kullanıcı arayüzündeki React bileşenlerinin hiyerarşik yapısını temsil eder. Kullanıcı arayüzünü oluşturmak için bileşenlerin birbiri içine nasıl yerleştirildiğini görselleştiren kavramsal bir modeldir. UI ağacı, geliştiricilerin bileşenlerin nasıl organize edildiğini ve verilerin uygulama içinde nasıl aktığını kavramsallaştırmasına yardımcı olduğu için React'te önemli bir kavramdır. React, sanal DOM ağacını önceki sürümle karşılaştırarak ve gerçek DOM'daki güncellemeleri yansıtmak için gereken minimum değişiklik kümesini belirleyerek kullanıcı arayüzünü verimli bir şekilde güncellemek için bu ağaç yapısını kullanır.

// Ağaçlar öğeler arasında bir ilişki modelidir ve kullanıcı arayüzü genellikle ağaç yapıları kullanılarak temsil edilir. Örneğin, tarayıcılar HTML (DOM) ve CSS'yi (CSSOM) modellemek için ağaç yapılarını kullanır. Mobil platformlar da görünüm hiyerarşilerini temsil etmek için ağaçları kullanır.

// Uygulamanızın bağımlılık ağacını anlamak ve yönetmek, özellikle uygulamanın karmaşıklığı arttıkça performansı optimize etmek ve paket boyutunu azaltmak için kesinlikle çok önemlidir.

// Bağımlılık Ağacı: React uygulamanız muhtemelen çeşitli harici kütüphanelerin (örn. React, ReactDOM, React Router) yanı sıra dahili modüllere ve bileşenlere bağlıdır. Bu bağımlılıklar, her modülün veya bileşenin diğer modüllere veya bileşenlere bağlı olduğu ağaç benzeri bir yapı oluşturur.

// Demetleme: React uygulamanızı üretim için oluşturduğunuzda, Webpack veya Parcel gibi bir paketleyici, uygulamanızın bağımlılık ağacını analiz etmekten ve gerekli tüm JavaScript, CSS ve diğer varlıkları tek bir veya birden fazla pakette bir araya getirmekten sorumludur. Bundler'lar bağımlılık ağacını takip ederek yalnızca uygulamanızda gerçekten kullanılan modülleri ve bileşenleri dahil eder, ölü kodları veya kullanılmayan bağımlılıkları hariç tutar. Bu, paket boyutunu azaltmaya ve yükleme performansını artırmaya yardımcı olur.

// Paket Boyutu Optimizasyonu: Büyük paket boyutları, indirme sürelerini artırarak ve kullanıcı arayüzünüzün oluşturulması için gereken süreyi geciktirerek performansı etkileyebilir. Uygulamanızın bağımlılık ağacını anlayarak gereksiz bağımlılıkları belirleyebilir ve ortadan kaldırabilir, paketleri daha küçük parçalara bölebilir, uygulamanızın bölümlerini tembel yüklemek için kod bölme tekniklerini kullanabilir ve paket boyutunu azaltmak ve performansı artırmak için diğer optimizasyon stratejilerini kullanabilirsiniz.

// Hata ayıklama: Uygulamanızın bağımlılık ağacını anlamak, paket boyutu ve yükleme süreleriyle ilgili performans sorunlarını ayıklamak için de yararlı olabilir. webpack-bundle-analyzer gibi araçlar uygulamanızın bağımlılık ağacını görselleştirebilir ve optimizasyon yapılabilecek alanları vurgulayabilir.

// Genel olarak, uygulamanızın bağımlılık ağacını yönetmek ve paket boyutunu optimize etmek, özellikle ölçeklendikçe ve daha karmaşık hale geldikçe React uygulamanızda optimum performans ve kullanıcı deneyimi sağlamak için temel görevlerdir. Uyanık kalarak ve bağımlılık yönetimi ve paket optimizasyonu için en iyi uygulamaları kullanarak uygulamanızın sorunsuz ve verimli bir şekilde çalışmasını sağlayabilirsiniz.