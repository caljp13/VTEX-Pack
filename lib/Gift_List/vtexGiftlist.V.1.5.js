/**
* Vtex Gift List
* @author Carlos Vinicius
* @version 1.5
* @date 2012-09-18
*/
jQuery.fn.vtexGiftlist=function(opts)
{
	var $this=jQuery(this);
	if($this.length<1)return $this;
	
	var defaults=
		{
			giftListWrap:".giftListWrap", // Elemento pai do controle de lista
			popupShow:function(){},
			// Fun��o que permite a formata��o/ajuste do bot�o "comprar" e "add a lista" na lista de SKU (multiplos Skus)
			buyBtnFormat:function(btn, listBtn)
			{
				var wrapList=jQuery('<div class="giftListBtn"></div>');
				var wrapBtn=jQuery('<div class="skuTplButtonsWrap"></div>');
				btn.after(wrapBtn);
				btn.appendTo(wrapBtn);
				listBtn.appendTo(wrapList);
				wrapList.appendTo(wrapBtn);
			}
		},
		options=jQuery.extend(defaults, opts),
		$b=jQuery("body"),
		$empty=jQuery(""),
		giftListWrap=$b.find(options.giftListWrap),
		_console=("object"==typeof(console));
		
	// Reportando erros
	if(giftListWrap.length<1){if(_console) console.log("Elemento contendo o controle de lista n�o encontrado ("+giftListWrap.selector+")"); return false;}

	var listWrapParent=giftListWrap.parent(),
		skuList=$b.find("div.skuList");
	
	var fns=
	{
		actions:function(listBtn)
		{
			var buttom=listBtn||$this;
			buttom.bind("click",function(){
				var noUser,msg;
				noUser=giftListWrap.find(".giftlistcreate-nouser");
				giftListWrap.find(".giftlistinsertsku").show();
				msg=giftListWrap.find(".giftlistinsertsku-message");

				if(msg.css("display")=="block")
					return alert(msg.text());
				
				msg.css("display","block").hide();

				if(buttom.hasClass("multipleSkus"))
				{
					giftListWrap.find(".giftlistinsertsku-button").each(function(){
						var link=jQuery(this);
						var val=link.attr("href")||"";
						var vals=val.split(",");
						vals[1]="'"+buttom.attr("rel")+"'";
						link.attr("href",vals.join(","));
					});
				}			
				
				if(noUser.length<1)
					giftListWrap.vtexPopUp2({initCallback:options.popupShow,closeCallback:function(){giftListWrap.appendTo(listWrapParent);}});
				else
				{
					alert("Voc� precisa estar logado para adicionar um item a lista.");
					document.location.href="https://"+document.location.host+"/Site/Login.aspx?ReturnUrl="+document.location.pathname;
					return false;
				}
			});
		},
		buyButton:function()
		{
			var buyBtn=skuList.find(".buy-button");
			if(buyBtn.length<1 || skuList.length<2) return false;
			
			var listBtn=$this.clone().addClass("multipleSkus");
			buyBtn.each(function(){
				var listLink=listBtn.clone();
				var btnBuy=jQuery(this);
				options.buyBtnFormat(btnBuy,listLink);
				listLink.attr("rel",
					(btnBuy.attr("href")||"").split("Sku=").pop()
				);
				fns.actions(listLink);
			});
			$this.hide();
		}
	}
	
	fns.actions();
	fns.buyButton();
	return $this;
};