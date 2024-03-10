// === SOME QUESTIONS === 

// 1. React'te giriş değerlerini (input, textarea vs) bir durumda tutmak zorunlu mu?

// React'te, girdi alanları veya textareas gibi bileşenlerin girdi değerlerini takip etmek için state kullanmak yaygın bir uygulamadır. State kullanmak kesinlikle gerekli olmasa da, state aracılığıyla girdi değerlerini yönetmek çeşitli avantajlar sağlar:

// Tek Doğruluk Kaynağı: Girdi değerlerini durum içinde depolayarak, değer için tek bir doğruluk kaynağı oluşturursunuz. Bu, değeri birden fazla bileşen arasında senkronize etmeyi veya girdi üzerinde doğrulama ve manipülasyon gerçekleştirmeyi kolaylaştırır.

// Reaktivite: Giriş değerlerini state'te saklamak, giriş değeri her değiştiğinde React'in bileşeni verimli bir şekilde yeniden oluşturmasını sağlar. Bu, kullanıcı arayüzünün kullanıcının girdisi ile senkronize kalmasını sağlar.

// Kontrollü Bileşenler: Giriş değerlerini yönetmek için state kullanmak, React'in giriş değeri üzerinde tam kontrole sahip olduğu kontrollü bileşenler oluşturur. Bu, kullanıcı girdisine göre kısıtlamalar uygulamanıza veya eylemleri tetiklemenize olanak tanır.

// Kolay Değişiklik: Durumda saklanan girdi değerlerini güncellemek, durum kancaları (işlevsel bileşenler için useState kancası veya sınıf bileşenleri için this.setState) tarafından sağlanan ayarlayıcı işlevleri kullanarak basittir.



// 2. setSometing() fonksiyonu için bir bakış açısı

// React'te useState kancasını kullandığınızda, useState tarafından döndürülen işlev (bu durumda setSomething), yeni bir değer veya bir işlevle çağrılabilen bir işlevdir.

// setSomething(newValue) gibi doğrudan yeni bir değerle setSomething'ı çağırdığınızda, React basitçe durumu bu yeni değere ayarlar. Geçtiğiniz argüman (newValue) yeni state değeri olur. Örneğin: setSomething(10) durumu 10 olarak ayarlar.

// setSomething'ı setSomething(prevValue => prevValue + 1) gibi bir fonksiyonla çağırdığınızda, React bu fonksiyonu argüman olarak önceki durum değeriyle çağırır. Bu durumda, prevValue (veya yaygın olarak adlandırıldığı gibi n) önceki durum değerini temsil eder. Bu fonksiyonun geri dönüş değeri yeni durum değeri olur. Örneğin: mevcut durum 5 ise, setSomething(prevValue => prevValue + 1) durumu 6 olarak ayarlar.

// Bu nedenle, setSomething(n => n + 1) kullanıldığında, n geçerli durum değerini değil, önceki durum değerini temsil eder. Bu, durum güncellemeleri asenkron veya toplu olsa bile React'in her zaman en güncel durum değeri üzerinde çalışmasını sağlar.


// 3. Olay işleyici fonksiyonları bileşenin neresinde bildirilmeli?
// React uygulamalarında performans ve organizasyon göz önünde bulundurulduğunda, genellikle olay işleyici işlevlerini bileşeninizin dönüş kısmının (JSX) dışında, bileşen içinde yerel işlevler veya bir sınıf bileşeninin yöntemleri olarak bildirmeniz önerilir.

// Olay işleyici işlevlerini geri dönüş kısmının dışında bildirmenin faydalı olmasının bazı nedenleri şunlardır:

// Performans: Olay işleyicilerini dönüş kısmının dışında tanımlamak, her render işleminde yeniden oluşturulmalarını önler. JSX içinde satır içi bir olay işleyici tanımlarsanız, bileşen her render edildiğinde yeni bir işlev örneği oluşturulur ve bu da özellikle bileşen sık sık render ediliyorsa performansı olumsuz etkileyebilir.
        // Not : Bileşen her yeniden işlendiğinde yeni bir işlev örneği oluşturulur. Bu, işleyici mantığı aynı kalsa bile her render işleminde yeni bir işlev oluşturulduğu anlamına gelir. Bu, gereksiz bellek ayırma ve çöp toplama ek yüküne yol açabileceğinden, özellikle bileşen sık sık yeniden işleniyorsa performansı olumsuz etkileyebilir.

// Okunabilirlik ve Sürdürülebilirlik: Olay işleyici işlevlerini JSX'ten ayırmak kodun okunabilirliğini ve bakımını iyileştirir. Özellikle birden fazla olay işleyicisi olan daha büyük bileşenler için bileşeninizin yapısını daha temiz ve anlaşılması daha kolay hale getirir.

// Yeniden kullanım: Olay işleyicilerini yerel işlevler olarak bildirmek, bunları bileşen içinde kolayca yeniden kullanmanıza veya alt bileşenlere prop olarak aktarmanıza olanak tanır. Bu, kodun yeniden kullanımını teşvik eder ve kod tabanınızı daha modüler hale getirir.


// 4. React neden form öğelerinin değişmesine state setterları dışıında izin vermez?
// Girdilerin içindeki metni değiştirememenizin nedeni, girdilerin state kişisine bağlı olarak sabit değerlere sahip olacak şekilde ayarlanmış olmasıdır. React'te, sabit değerlere sahip girdiler kontrollü bileşenler olarak kabul edilir. Kontrollü bileşenler değerlerini durumdan alırlar ve kullanıcının kullanıcı girişi yoluyla değeri doğrudan değiştirmesine izin vermezler.

// Girdileri düzenlenebilir hale getirmek için, kullanıcı girdileri yazdığında durum kişisini güncellemeniz gerekir. Bunu, girdi değerleri her değiştiğinde durumu güncelleyecek olan onChange olay işleyicilerini girdilere ekleyerek başarabilirsiniz.

// Girdilerin içindeki metni doğrudan değiştirememenizin nedeni, React'in form girdilerini işleme biçimidir. React tek yönlü bir veri akışını zorunlu kılar, bu da verilerin (durum) tek yönde aktığı anlamına gelir: durumdan kullanıcı arayüzü öğelerine. Bu, "tek doğruluk kaynağı" ilkesi olarak bilinir.

// Bu, girdileri React'te kontrollü bileşenler haline getirir. Kontrollü bileşenler değerlerini durumdan alır ve onChange olayları aracılığıyla günceller.

// Dolayısıyla, giriş alanlarının içine yazmaya çalıştığınızda, giriş değerleri state tarafından kontrol edildiği için React buna izin vermez. Kullanıcı girişine izin vermek istiyorsanız, onChange olayını ele almanız ve sağladığım güncellenmiş kodda gösterildiği gibi durumu buna göre güncellemeniz gerekir.

// Bu yaklaşım, React'in girdilerin durumu üzerinde kontrol sahibi olmasını ve kullanıcı arayüzü ile altta yatan veriler arasında tutarlılık olmasını sağlar. Ayrıca form verilerini yönetmeyi ve form durumuna göre doğrulama veya koşullu işleme gibi özellikleri uygulamayı kolaylaştırır.


// 5. Neden her "değişebilen" değişkenler için state kullanılmaz?

// import { useState } from 'react';

// let nextId = 0;

// export default function List() {
//   const [name, setName] = useState('');
//   const [artists, setArtists] = useState([]);

//   return (
//     <>
//       <h1>Inspiring sculptors:</h1>
//       <input
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <button onClick={() => {
//         setArtists([
//           ...artists,
//           {
//             id: nextId++,
//             name: name
//           }
//         ])
//       }}>Add</button>
//       <ul>
//         {artists.map(artist => (
//           <li key={artist.id}>{artist.name}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// React'te state, zaman içinde değişen ve bileşenin render'ını etkileyen verileri yönetmek için kullanılmalıdır. 

// Genellikle şu verileri yönetmek için state kullanılması önerilir:

// Zaman içinde değişir ve kullanıcı arayüzüne yansıtılması gerekir.
// Render'lar arasında kalıcı olması gerekir.
// Bileşenin davranışını veya görünümünü etkiler.
// nextId durumunda, yalnızca liste öğeleri için benzersiz kimlikler oluşturmak için kullanılır ve bileşenin görünümünü veya davranışını doğrudan etkilemez. Bu nedenle, nextId için yerel bir değişken kullanmak geçerli bir yaklaşımdır çünkü kodu basitleştirir ve durum güncellemelerinin neden olduğu gereksiz yeniden oluşturmaları önler.

// Ancak, nextId bileşenin davranışını veya görünümünü bir şekilde etkileyecekse ya da değerinin render'lar arasında kalıcı olması gerekiyorsa (örneğin, bileşen sökülüp yeniden takılırsa), nextId için state kullanmak daha uygun olacaktır.

// Özetle, zaman içinde değişen verileri yönetmek için genellikle state kullanılması önerilse de, nextId'de olduğu gibi basitlik ve performans nedenleriyle yerel bir değişken kullanmanın daha uygun olabileceği senaryolar vardır. Yazılım geliştirmedeki birçok kararda olduğu gibi, sonuçta bu, uygulamanızın özel gereksinimlerine ve kısıtlamalarına bağlıdır.


// 6. Shallow Copy Nedir? Programlamada kopyalama çeşitleri.
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