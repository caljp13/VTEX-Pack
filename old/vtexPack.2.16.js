/**
* Vtex Pack
* @version 2.16
* @date 2012-08-21
*/

/**
* Vtex Cart v2
* @author Carlos Vinicius
* @version 2.6
* @date 2012-07-20
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
jQuery.fn.vtexCart=function(c){var a=jQuery(this);if(a.length<1)return a;log=function(d,a){i&&console.log("[Cart2 - "+(a||"Erro")+"] "+d)};var g=jQuery.extend({cartQtt:".vtex-cartQtt",cartTotal:".vtex-cartTotal",itemsText:".vtex-ItemsText",callback:function(){}},c),h=jQuery(""),i="object"===typeof console,c=true,b=function(){a.each(function(){var d=jQuery(this),a=d.find(g.cartQtt)||h,c=d.find(g.cartTotal)||h,b=d.find(g.itemsText)||h,e={getCartInfo:function(){document.location.host.indexOf("localhost")==
0&&e.localhost();jQuery.ajax({url:"/no-cache/QuantidadeItensCarrinho.aspx",success:e.cartInfoAjaxSuccess,error:e.cartInfoAjaxError})},localhost:function(){c.html("998,75");a.html(12);e.singularPlural(12)},cartInfoAjaxSuccess:function(f){var f=jQuery(f),b=f.find(".amount-items-em").html();if(!(1>f.filter(".cartInfoWrapper").length)){d.show();c.html(f.find(".total-cart-em").html());a.html(b);e.singularPlural(b)}},cartInfoAjaxError:function(){log("N\u00e3o foi poss\u00edvel fazer a requisi\u00e7\u00e3o p/ obter os dados do carrinho.");
-1<document.location.host.indexOf("localhost")&&d.show()},singularPlural:function(a){a=parseInt(a,10);isNaN(a)?log("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero!"):a===1?b.hide().filter(".singular").show():b.hide().filter(".plural").show()}};e.getCartInfo()})};if(0<jQuery("body").filter(".cadastro-cliente, .login, .email-mudou, .esqueci-senha, .esqueci-email").length){c=false;a.hide();jQuery.ajax({url:"/Control/TopBarAssincrono.aspx",success:function(a){1>jQuery(a).filter("#MenuWelcomeDeslogado").length&&
b()}})}c&&b();g.callback();return a};
/**
* Newslleter V2
* @author Carlos Vinicius
* @version 3.5
* @date 2012-08-21
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
jQuery.fn.vtexNews2=function(l){var d=jQuery(this);if(d.length<1)return d;var b=jQuery.extend({defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".vtexNewsName",emailField:".vtexNewsEmail",btn:".vtexNewsButton",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",setDefaultName:true,checkNameExist:true,getAttr:"alt",successCallback:function(){}},l),e="object"===typeof console;if("function"!==typeof jQuery.fn.vtexPopUp2){e&&console.log("[vtexNews2 - Erro] O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2.");
return d}d.each(function(){var c=jQuery(this),f=c.find(b.nameField),d=c.find(b.emailField),g=c.find(b.btn),h=c.find(b.elementError),i=c.find(b.elementSuccess);if(f.length<1&&b.checkNameExist){e&&console.log("[vtexNews2] Campo de nome, n\u00e3o encontrado ("+f.selector+")");return c}if(d.length<1){e&&console.log("[vtexNews2] Campo de e-mail, n\u00e3o encontrado ("+d.selector+")");return c}if(g.length<1){e&&console.log("[vtexNews2] Bot\u00e3o de envio, n\u00e3o encontrado ("+g.selector+")");return c}if(i.length<
1||h.length<1){e&&console.log("[vtexNews2] A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+i.selector+", "+h.selector+")");return c}b.setDefaultName&&f.is("input[type=text], textarea")&&f.val(b.defaultName);d.val(b.defaultEmail);b.checkNameExist&&f.filter(":visible").queue(function(){var a=jQuery(this),c=a.val();f.is("input, textarea")&&a.bind({focus:function(){a.val()==c&&(a.val().search(b.defaultName.substr(0,6))==0||b.setDefaultName)&&a.val("")},blur:function(){a.val()==""&&a.val(c)}})});
d.queue(function(){var a=jQuery(this),c=a.val();a.bind({focus:function(){a.val()==c&&a.val().search(b.defaultEmail.substr(0,6))==0&&a.val("")},blur:function(){a.val()==""&&a.val(c)}})});var j=function(){var a,d;d=(a=c.find(b.nameField).filter("input[type=text],select,textarea").val())?a:(a=c.find(b.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val())?a:(a=c.find(b.nameField).attr(b.getAttr))?a:(a=c.find(b.nameField).text())?a:(a=c.find(b.nameField).find(".box-banner img:first").attr("alt"))?
a:"";a=(c.find(b.emailField).val()||"").trim();var e=c.find(b.nameField).is(":visible");if((d.length<1||d.search(b.defaultName.substr(0,6))==0)&&(b.checkNameExist||e?e:1)||a.search(/^[a-z0-9\_\-\.]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i)<0)h.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"});else{g.attr("disabled","disabled");jQuery.ajax({url:"/no-cache/Newsletter.aspx",type:"POST",data:{newsletterClientEmail:a,newsletterClientName:d,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||
"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},success:function(){g.removeAttr("disabled");i.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"});b.setDefaultName&&f.is("input, textarea")&&c.find(b.nameField).val(b.defaultName);c.find(b.emailField).val(b.defaultEmail);b.successCallback()}})}};g.bind("click",j);var k=function(a){if(13==(a.keyCode?a.keyCode:a.which)){a.preventDefault();j()}};f.filter("input, textarea").bind("keydown",k);d.bind("keydown",k)});return d};
/**
* Vtex Gift List
* @author Carlos Vinicius
* @version 1.3
* @date 2012-08-03
*/
jQuery.fn.vtexGiftlist=function(b){var e=jQuery(this);if(1>e.length)return e;var h=jQuery.extend({giftListWrap:".giftListWrap",callback:function(){},buyBtnFormat:function(a,c){var d=jQuery('<div class="giftListBtn"></div>'),f=jQuery('<div class="skuTplButtonsWrap"></div>');a.after(f);a.appendTo(f);c.appendTo(d);d.appendTo(f)}},b),b=jQuery("body");jQuery("");var a=b.find(h.giftListWrap),j="object"==typeof console;if(1>a.length)return j&&console.log("Elemento contendo o controle de lista n\u00e3o encontrado ("+
a.selector+")"),!1;var k=a.parent(),i=b.find("div.skuList"),g={actions:function(b){var c=b||e;c.bind("click",function(){var d=a.find(".giftlistcreate-nouser");a.find(".giftlistinsertsku").show();a.find(".giftlistinsertsku-message").css("display","block").hide();c.hasClass("multipleSkus")&&a.find(".giftlistinsertsku-button").each(function(){var a=jQuery(this),d=(a.attr("href")||"").split(",");d[1]="'"+c.attr("rel")+"'";a.attr("href",d.join(","))});if(1>d.length)a.vtexPopUp2({closeCallback:function(){a.appendTo(k)}});
else return alert("Voc\u00ea precisa estar logado para adicionar um item a lista."),document.location.href="https://"+document.location.host+"/Site/Login.aspx?ReturnUrl="+document.location.pathname,!1})},buyButton:function(){var a=i.find(".buy-button");if(1>a.length||2>i.length)return!1;var c=e.clone().addClass("multipleSkus");a.each(function(){var a=c.clone(),b=jQuery(this);h.buyBtnFormat(b,a);a.attr("rel",(b.attr("href")||"").split("Sku=").pop());g.actions(a)});e.hide()}};g.actions();g.buyButton();
return e};
/**
* PopUps
* @author Carlos Vinicius
* @version 1.21
* @date 2012-08-07
*/
jQuery.fn.vtexPopUp2=function(k){var b=jQuery(this);if(1>b.length)return b;var i=jQuery("body"),d=i.find(".boxPopUp2"),j="object"==typeof console;1>d.length&&(d=jQuery('<div class="boxPopUp2"><div class="boxPopUp2-wrap"><span class="boxPopUp2-close"></span><div class="boxPopUp2-content"></div></div></div>'),i.prepend(d),d.after('<div class="boxPopUp2-overlay"></div>'));var c=jQuery.extend({popupType:null,closeContent:null,popupClass:"",quickViewClass:"",initCallback:function(){},closeCallback:function(){}},
k),k=d.find(".boxPopUp2-close"),f=d.find(".boxPopUp2-content"),m=i.find(".boxPopUp2-close, .boxPopUp2-overlay"),n=i.find(".boxPopUp2-overlay"),h=jQuery(document);null!=c.closeContent&&k.html(c.closeContent);var a={positioning:function(){var a=h.scrollTop(),c=jQuery(window).height(),b=d.outerHeight(true);d.css("top",a+(b>=c?20:(c-b)/2)+"px")},show:function(e){e=e||{};n.fadeTo("fast",0.5,function(){d.show().addClass("popupOpened");"boolean"===typeof e.loading&&e.loading===true?a.showLoading():a.hideLoading();
"function"===typeof e.callback?e.callback():c.initCallback(d)})},hideLoading:function(){f.filter(":visible").css("background-image","none")},showLoading:function(){f.filter(":visible").css("background-image",'url("/arquivos/ajax-loader.gif")')},close:function(a){var a=a||{},g=function(){n.fadeOut("fast");d.fadeOut("fast",function(){f.empty()});f.attr("class","boxPopUp2-content");d.attr("class","boxPopUp2")};typeof a.closeNow=="boolean"&&a.closeNow==true&&g();if(m.filter(".boxPopUp2-clickActive").length<
1){m.addClass("boxPopUp2-clickActive").bind("click",function(){"function"===typeof a.clickCallback?a.clickCallback():c.closeCallback(d);g()});h.bind("keyup",function(a){(a.keyCode?a.keyCode:a.which)==27&&g()})}if(b.hasClass("autoClose")){var l=(b.attr("class")||"").split("ac_").pop().split(" ").shift();if(isNaN(parseFloat(l))){j&&console.log("[Erro] O tempo informado (em segundos) n\u00e3o \u00e9 um valor num\u00e9rico: \u201c"+l+"\u201d");return false}setTimeout(function(){g()},l*1E3)}},setType:function(){if(b.hasClass("quickViewLink"))a.quickView();
else if(b.hasClass("giftListWrap"))a.giftList();else if(b.hasClass("installmentInfoTpl"))a.paymentForms();else if(b.hasClass("shipping-value"))a.calculateShipping();else if(b.hasClass("freeContent"))a.freeContent();else if(b.hasClass("boxPopUp2"))a.closeNow();else if(b.hasClass("referAFriendTpl"))a.productReferAFriend();else if(b.filter("#btnReferAFriend").length>0)a.giftListReferFriend();else if(b.filter("#lnkPubliqueResenha").length>0)a.postRatingComment();else if(b.filter("#palerta").length>0)a.cartCheckoutAlert();
else if(b.hasClass("lnkAddPhoto")){c.popupType="minhaContaFoto";a.userAccount()}else return false},checkType:function(){"cadastroCliente"===c.popupType||"minhaContaFoto"===c.popupType?a.userAccount():"newsletter"===c.popupType?a.newsletter():"quickview"===c.popupType?a.quickView():"giftlist"===c.popupType?a.giftList():"paymentforms"===c.popupType?a.paymentForms():"shipping"===c.popupType?a.calculateShipping():typeof c.popupType=="string"&&"freecontent"===c.popupType.toLowerCase()?a.freeContent():
"closenow"===c.popupType?a.closeNow():"GiftListReferAFriend"===c.popupType?a.giftListReferFriend():"postRatingComment"===c.popupType?a.postRatingComment():a.freeContent()},exec:function(){null===c.popupType?a.setType():false===a.checkType()&&a.setType();c.initCallback()},userAccount:function(){var e="";"cadastroCliente"===c.popupType?e="signInPopups":"minhaContaFoto"===c.popupType&&(e="profilePhoto");b.unbind().removeAttr("onclick");var g=b.attr("href")||"";b.bind("click",function(){d.addClass(c.popupClass+
" "+e+"Main");""===g&&j&&console.log("N\u00e3o existe URL no atributo href");jQuery('<iframe src="'+g+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(f.addClass(c.popupClass+" "+e));a.show({loading:true});a.positioning();a.close();return false})},newsletter:function(){b.clone().appendTo(f.addClass(c.popupClass+" newsletterPopup"));d.addClass(c.popupClass+" newsletterMain");a.show();a.positioning();a.close()},quickView:function(){var b=i.find(""!==c.quickViewClass?c.quickViewClass:
".quickViewLink"),g=function(){b.filter(":not(.quickViewLinkActivated)").addClass("quickViewLinkActivated").bind("click",function(){jQuery('<iframe src="'+jQuery(this).attr("href")+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(f.addClass(c.popupClass+" productQuickView"));d.addClass(c.popupClass+" quickViewMain");a.show({loading:true});a.positioning();a.close();return false})};g();h.ajaxStop(g)},paymentForms:function(){var e="",g=function(){var a=i.find(".see-other-payment-method-link");
if(a.length<1){j&&console.log("Url das formas de pagamento n\u00e3o encontrado. \n Verifique se o controle esta na p\u00e1gina.\n("+a.selector+")");return false}e=/http:[a-z.\/\?=0-9&]+/i.exec(a[0].onclick.toString())[0]||"#onclickError"};g();b.bind("click",function(){jQuery("<iframe src='"+e+"' frameborder='0' allowtransparency='true'></iframe>").appendTo(f.addClass(c.popupClass+" paymentFormsPopup"));d.addClass(c.popupClass+" paymentFormsMain");a.show({loading:true});a.positioning();a.close();return false});
h.ajaxStop(g)},calculateShipping:function(){h.ajaxStop(function(){var b=i.find("#calculoFrete").children();if(b.length<1)return false;b.find("span.cep-busca a").attr("target","_blank");b.appendTo(f.addClass(c.popupClass+" shippingCalculationPopup"));d.addClass(c.popupClass+" shippingCalculationMain");a.show();a.positioning();a.close()})},giftList:function(){b.appendTo(f.addClass(c.popupClass+" giftListPopup"));d.addClass(c.popupClass+" giftListMain");a.show();a.positioning();a.close({clickCallback:c.closeCallback})},
cartCheckoutAlert:function(){b.appendTo(f.addClass(c.popupClass+" cartCheckoutAlertPopup"));d.addClass(c.popupClass+" cartCheckoutAlertMain");a.show();a.positioning();a.close()},freeContent:function(){b.appendTo(f.addClass(c.popupClass+" freeContentPopup"));d.addClass(c.popupClass+" freeContentMain");a.show();a.positioning();a.close()},closeNow:function(){a.close({closeNow:true})},giftListReferFriend:function(){var e=function(){var b=$(this).attr("href");if("undefined"===typeof b||""===b){j&&console.log("[Erro] Url do popup n\u00e3o encontrada.");
return false}f.addClass(c.popupClass+" freeContentPopup").load(b);d.addClass(c.popupClass+" giftListReferFriendMain");a.show({loading:true});a.positioning();a.close();return false},g=function(){b.unbind().bind("mouseenter",function(){b.unbind().bind("click",e)})};g();h.ajaxStop(g)},productReferAFriend:function(){var e=jQuery('<div class="referAFriendPopUpWrap"></div>');b.bind("click",function(){var b=(jQuery(this).parent().find("#div-referAFriend input").attr("onclick")||"").toString(),b=/\/referAFriend\/Form\/[0-9]+\?/i.exec(b);
if(null===b){alert("Desculpe, n\u00e3o foi poss\u00edvel abrir o formul\u00e1rio.");return false}e.empty().load(b[0],function(){a.positioning()});e.appendTo(f.addClass(c.popupClass+" freeContentPopup"));d.addClass(c.popupClass+" freeContentMain");a.show();a.positioning();a.close();return false});h.ajaxStop(function(){f.find(".referAFriendPopUpWrap #btnFechar").length>0&&setTimeout(a.closeNow,1500)})},postRatingComment:function(){var e=false;if(b.filter(":not(.popUpPublishReviewActivated)").length<
1)return false;b.bind("click",function(){var b=jQuery(this).attr("href")||"";if(""===b){j&&console.log("[Erro] N\u00e3o foi poss\u00edvel obter os dados para abrir o popup de resenha.");return false}b=b.split(")").shift().split("(").pop().split(",");if(3!=b.length){j&&console.log("[Erro] O array com os dados do cliente retornou um valor inesperado.");return false}if(e)return false;e=true;jQuery.ajax({url:"/publishuserreviewcomment",type:"POST",data:{productId:b[1],clientId:b[0],categoryId:b[2]},success:function(b){var g=
jQuery(b);f.addClass(c.popupClass+" userReviewPopup").html(g);d.addClass(c.popupClass+" userReviewPopupMain");a.show({callback:function(){g.find("#txtTituloResenha:hidden").val("titulo_auto");var a=f.find("a#rtAvaliacao_A0"),b=function(){a.attr("title",a.find(".filledRatingStar:last").index()+1||0)};a.find("span").bind("mouseenter",b);a.bind("mouseleave",b)}});a.positioning();a.close();e=false},error:function(){e=false}});return false}).addClass("popUpPublishReviewActivated");jQuery.fn.vtexPopUp2.data.userReviewCount==
0&&h.ajaxStop(function(){f.hasClass("userReviewPopup")&&f.find(".formUserComment").children().length==0&&a.closeNow()});jQuery.fn.vtexPopUp2.data.userReviewCount++}};a.exec();return b};jQuery.fn.vtexPopUp2.data={userReviewCount:0};

// AUTOLOADS
$(function(){
	var b=$("body");
	/* Carriho */ b.find(".cartWrapper").vtexCart();
	/* Gift List */ b.find(".giftListButtonTpl").vtexGiftlist();
	/* Newsletter */ b.find(".vtexNewsWrap").vtexNews2();
	/* Quickview */ b.find(".quickViewLink").vtexPopUp2();
	/* Formas de pagamento */ b.find(".installmentInfoTpl").vtexPopUp2();
	/* C�lculo de frete */ b.find(".shipping-value").vtexPopUp2();
	/* Inidcar a um amigo (P�g. Listas Gerenciar) */ b.find("td.giftlist-body-action-sendfriend #btnReferAFriend").vtexPopUp2();
	/* Minha conta - alterar foto */ b.filter(".minha-conta").find(".lnkAddPhoto").vtexPopUp2();
	/* cadastro */ b.filter(".cadastro-cliente").find(".thickbox").vtexPopUp2({"popupType":"cadastroCliente"});
	/* Indicar � um amigo (pg. Produto) */ b.find(".referAFriendTpl").vtexPopUp2();
});
$(document).ajaxStop(function(){
	var b=$("body");
	/* Publicar coment�rio sobre o produto */ b.find("#lnkPubliqueResenha[href*='javascript']").vtexPopUp2();
});