// === SOME QUESTIONS === 

// 1. React'te giriş değerlerini (input, textarea vs) bir durumda tutmak zorunlu mu?
// React'te, girdi alanları veya textarea gibi bileşenlerin girdi değerlerini takip etmek için state kullanmak yaygın bir uygulamadır. State kullanmak kesinlikle gerekli olmasa da, state aracılığıyla girdi değerlerini yönetmek çeşitli avantajlar sağlar:

// Tek Doğruluk Kaynağı: Girdi değerlerini durum içinde depolayarak, değer için tek bir doğruluk kaynağı oluşturursunuz. Bu, değeri birden fazla bileşen arasında senkronize etmeyi veya girdi üzerinde doğrulama ve manipülasyon gerçekleştirmeyi kolaylaştırır.

// Reaktivite: Giriş değerlerini state'te saklamak, giriş değeri her değiştiğinde React'in bileşeni verimli bir şekilde yeniden oluşturmasını sağlar. Bu, kullanıcı arayüzünün kullanıcının girdisi ile senkronize kalmasını sağlar.

// Kontrollü Bileşenler: Giriş değerlerini yönetmek için state kullanmak, React'in giriş değeri üzerinde tam kontrole sahip olduğu kontrollü bileşenler oluşturur. Bu, kullanıcı girdisine göre kısıtlamalar uygulamanıza veya eylemleri tetiklemenize olanak tanır.

// Kolay Değişiklik: Durumda saklanan girdi değerlerini güncellemek, durum kancaları (işlevsel bileşenler için useState kancası veya sınıf bileşenleri için this.setState) tarafından sağlanan ayarlayıcı işlevleri kullanarak basittir.


// 2. Olay işleyici fonksiyonları bileşenin neresinde bildirilmeli?
// React uygulamalarında performans ve organizasyon göz önünde bulundurulduğunda, genellikle olay işleyici işlevlerini bileşeninizin dönüş kısmının (JSX) dışında, bileşen içinde yerel işlevler veya bir sınıf bileşeninin yöntemleri olarak bildirmeniz önerilir.

// Olay işleyici işlevlerini geri dönüş kısmının dışında bildirmenin faydalı olmasının bazı nedenleri şunlardır:

// Performans: Olay işleyicilerini dönüş kısmının dışında tanımlamak, her render işleminde yeniden oluşturulmalarını önler. JSX içinde satır içi bir olay işleyici tanımlarsanız, bileşen her render edildiğinde yeni bir işlev örneği oluşturulur ve bu da özellikle bileşen sık sık render ediliyorsa performansı olumsuz etkileyebilir.
        // Not : Bileşen her yeniden işlendiğinde yeni bir işlev örneği oluşturulur. Bu, işleyici mantığı aynı kalsa bile her render işleminde yeni bir işlev oluşturulduğu anlamına gelir. Bu, gereksiz bellek ayırma ve çöp toplama ek yüküne yol açabileceğinden, özellikle bileşen sık sık yeniden işleniyorsa performansı olumsuz etkileyebilir.

// Okunabilirlik ve Sürdürülebilirlik: Olay işleyici işlevlerini JSX'ten ayırmak kodun okunabilirliğini ve bakımını iyileştirir. Özellikle birden fazla olay işleyicisi olan daha büyük bileşenler için bileşeninizin yapısını daha temiz ve anlaşılması daha kolay hale getirir.

// Yeniden kullanım: Olay işleyicilerini yerel işlevler olarak bildirmek, bunları bileşen içinde kolayca yeniden kullanmanıza veya alt bileşenlere prop olarak aktarmanıza olanak tanır. Bu, kodun yeniden kullanımını teşvik eder ve kod tabanınızı daha modüler hale getirir.


// 3. Neden her "değişebilen" değişken için state kullanılmaz?

import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          {
            id: nextId++,
            name: name
          }
        ])
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}

// React'te state, zaman içinde değişen ve bileşenin render'ını etkileyen verileri yönetmek için kullanılmalıdır. 

// Genellikle şu verileri yönetmek için state kullanılması önerilir:

// Zaman içinde değişir ve kullanıcı arayüzüne yansıtılması gerekir.
// Render'lar arasında kalıcı olması gerekir.
// Bileşenin davranışını veya görünümünü etkiler.
// nextId durumunda, yalnızca liste öğeleri için benzersiz kimlikler oluşturmak için kullanılır ve bileşenin görünümünü veya davranışını doğrudan etkilemez. Bu nedenle, nextId için yerel bir değişken kullanmak geçerli bir yaklaşımdır çünkü kodu basitleştirir ve durum güncellemelerinin neden olduğu gereksiz yeniden oluşturmaları önler.

// Ancak, nextId bileşenin davranışını veya görünümünü bir şekilde etkileyecekse ya da değerinin render'lar arasında kalıcı olması gerekiyorsa (örneğin, bileşen sökülüp yeniden takılırsa), nextId için state kullanmak daha uygun olacaktır.

// Özetle, zaman içinde değişen verileri yönetmek için genellikle state kullanılması önerilse de, nextId'de olduğu gibi basitlik ve performans nedenleriyle yerel bir değişken kullanmanın daha uygun olabileceği senaryolar vardır. Yazılım geliştirmedeki birçok kararda olduğu gibi, sonuçta bu, uygulamanızın özel gereksinimlerine ve kısıtlamalarına bağlıdır.


// 4. Shallow Copy Nedir? Programlamada kopyalama çeşitleri.
// Programlamada, yüzeysel kopyalama, iç içe geçmiş tüm nesneleri özyinelemeli olarak kopyalamak yerine, bir nesnenin yalnızca doğrudan özelliklerinin kopyalandığı bir kopyalama türüdür. Bu, üst düzey yapı kopyalanırken, orijinal nesne içindeki tüm iç içe geçmiş nesnelerin kopyalanan nesnede hala referans alındığı anlamına gelir.

// Genel olarak iki tür kopyalama mekanizması vardır:

// Sığ Kopya: Yukarıda açıklandığı gibi, sığ bir kopya bir nesnenin yalnızca anlık özelliklerini çoğaltır. JavaScript'te, sığ kopyalar oluşturmak için yaygın yöntemler şunlardır:

// Object.assign(): Bu yöntem, bir veya daha fazla kaynak nesneden hedef nesneye tüm numaralandırılabilir kendi özelliklerinin değerlerini kopyalayarak yeni bir nesne oluşturur.

// Yayma sözdizimi (...): Bu sözdizimi, dizi değişmezlerini veya nesne değişmezlerini yüzeysel olarak kopyalamak için kullanılabilir. Örneğin, const copy = { ...original } orijinalin sığ bir kopyasını oluşturur.

// Array.slice(): Dizilerle birlikte kullanıldığında, slice() argümansız olarak tüm diziyi yüzeysel olarak kopyalamak için kullanılabilir.

// Sığ kopyalama, basit veri yapılarıyla uğraşırken veya derin kopyalama gerekmediğinde verimli ve yeterlidir.

// Derin Kopyalama: Derin kopyalama yeni bir nesne oluşturur ve içindeki tüm iç içe geçmiş nesneleri özyinelemeli olarak kopyalar. Başka bir deyişle, her iç içe geçme seviyesi kopyalanarak orijinal nesnede yapılan değişikliklerin kopyalanan nesneyi etkilememesi sağlanır ve bunun tersi de geçerlidir. Derin kopyalama genellikle karmaşık iç içe geçmiş veri yapılarıyla uğraşırken gereklidir.

// JavaScript'te derin kopyalama, özel işlevler veya _.cloneDeep() gibi yöntemler sağlayan lodash gibi kütüphaneler kullanılarak gerçekleştirilebilir.

// İşte yüzeysel kopyaya karşı derin kopyanın bir örneği:
const original = {
        a: 1,
        b: { c: 2 }
    };
    
    // Shallow copy
    const shallowCopy = Object.assign({}, original);
    shallowCopy.b.c = 3;
    
    console.log(original);   // { a: 1, b: { c: 3 } }
    console.log(shallowCopy); // { a: 1, b: { c: 3 } }
    
    // Deep copy using JSON serialization
    const deepCopy = JSON.parse(JSON.stringify(original));
    deepCopy.b.c = 4;
    
    console.log(original);  // { a: 1, b: { c: 3 } }
    console.log(deepCopy);  // { a: 1, b: { c: 4 } }

// Bu örnekte, sığ kopyadaki iç içe geçmiş b nesnesinde yapılan değişiklikler hem orijinali hem de kopyayı etkilerken, derin kopyadaki iç içe geçmiş nesnede yapılan değişiklikler yalnızca kopyayı etkiler.

// Bu kopyalama mekanizmaları farklı amaçlara hizmet eder ve uygulamanızın gereksinimlerine ve verilerinizin yapısına göre seçilmelidir.


// 5. React State'de kompleks veri tipleri ile çalışırken dikkat edilmesi gereken hususlar

// React state'te karmaşık veri türleriyle (nesneler veya diziler gibi) çalışırken, beklenmedik davranışlardan kaçınmak için state güncellemelerinin nasıl çalıştığını anlamak önemlidir. Bu konuyu daha derinlemesine inceleyelim:

// React'te Durum Güncellemeleri:
// React'te durum güncellemeleri genellikle eski durumun yenisiyle değiştirilmesiyle gerçekleştirilir. Bu, setter işlevini yeni bir değerle çağırdığınızda, React'in herhangi bir değişiklik olup olmadığını belirlemek için yeni değeri önceki durumla karşılaştırdığı anlamına gelir. Bir fark varsa, React bileşeni güncellenmiş durumla yeniden oluşturacaktır.
// setState'in yeni durumu bir önceki durumla birleştirdiği sınıf bileşenlerinin aksine, işlevsel bileşenlerdeki setter işlevi eski durumu tamamen yenisiyle değiştirir.

// Karmaşık Veri Türlerini İşleme:
// Nesneler veya diziler gibi karmaşık veri türleriyle çalışırken, durumu değişmez bir şekilde güncellediğinizden emin olmanız çok önemlidir. React, referansları karşılaştırarak değişiklikleri tespit etmeye dayandığından, durumu doğrudan değiştirmek beklenmedik davranışlara yol açabilir.
// Karmaşık state'i doğru şekilde güncellemek için, genellikle güncellenmiş değerlerle yeni bir nesne veya dizi oluşturur ve ardından bunu setter işlevine geçirirsiniz. Bu, React'in değişikliği algılamasını ve buna göre yeniden oluşturmayı tetiklemesini sağlar.

// Setter İşlev Davranışı:
// Setter fonksiyonunu yeni bir değerle çağırdığınızda, React referansları karşılaştırarak yeni değerin önceki durumdan farklı olup olmadığını belirler.
// Yeni değer önceki durumdan farklı bir referansa sahipse, React bunu bir durum güncellemesi olarak değerlendirir ve bileşenin yeniden render edilmesini planlar.
// Bu nedenle, yeni değer önceki durumla aynı içeriğe sahip olsa ancak farklı bir referansa sahip olsa bile (değişmezlik nedeniyle), React değişiklikleri yansıtmak için bileşeni yeniden oluşturacaktır.
// Özünde, karmaşık veri türleriyle çalışırken, güncellenmiş değerlerle yeni nesneler veya diziler oluşturarak durumu değişmez bir şekilde güncellemek çok önemlidir. Bu, React'in durum değişikliklerini doğru bir şekilde algılamasını ve gerekli yeniden render işlemlerini tetiklemesini sağlar. Setter fonksiyonu, bir durum güncellemesinin gerçekleşip gerçekleşmeyeceğini belirlemek için referansları karşılaştırarak yeni değeri işler.


