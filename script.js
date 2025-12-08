/* =============================
   Gestion du flux de souscription
   Ã‰tapes : conditions -> identification -> paiement
   ============================= */

(function(){
  const STEP_URLS = {
    conditions: 'conditions.html',
    identification: 'identification.html',
    paiement: 'paiement.html'
    // Ajouter d'autres Ã©tapes si besoin: programme: 'souscrire.html', etc.
  };

  const STEP_ORDER = ['conditions','identification','paiement'];

  const LS_KEY = 'currentStep';

  function getCurrentPage(){
    return window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  }

  function getSavedStep(){
    return localStorage.getItem(LS_KEY);
  }

  function goToStep(step, url){
    if(!step || !url) return;
    localStorage.setItem(LS_KEY, step);
    window.location.href = url;
  }

  // Optionnel : aller Ã  l'Ã©tape suivante automatiquement
  function nextStep(){
    const saved = getSavedStep();
    const idx = STEP_ORDER.indexOf(saved);
    if(idx >= 0 && idx < STEP_ORDER.length -1){
      const next = STEP_ORDER[idx+1];
      goToStep(next, STEP_URLS[next]);
    }
  }

  // Redirection au rechargement selon Ã©tape sauvegardÃ©e
  (function handleAutoRedirect(){
    const saved = getSavedStep();
    if(!saved) return; // Rien de sauvegardÃ© -> rester oÃ¹ on est (accueil)
    const targetUrl = STEP_URLS[saved];
    if(!targetUrl) return;

    const current = getCurrentPage();

    // EmpÃªche boucle : si dÃ©jÃ  sur la bonne page -> ne rien faire
    if(current === targetUrl) return;

    // Redirige seulement si la page actuelle n'est pas dÃ©jÃ  une page Ã©tape postÃ©rieure voulue
    window.location.replace(targetUrl);
  })();

  // Expose globalement
  window.goToStep = goToStep;
  window.nextStep = nextStep;

  // Boutons avec attributs data-step (facultatif)
  document.addEventListener('click', e=>{
    const el = e.target.closest('[data-go-step]');
    if(!el) return;
    const step = el.getAttribute('data-go-step');
    if(!step || !STEP_URLS[step]) return;
    goToStep(step, STEP_URLS[step]);
  });

  // Bouton reset progression
  const resetBtn = document.getElementById('resetProgress');
  if(resetBtn){
    resetBtn.addEventListener('click', ()=>{
      localStorage.removeItem(LS_KEY);
      // Optionnel: revenir Ã  l'accueil
      // window.location.href='index.html';
    });
  }

  // Marquer explicitement l'Ã©tape si la page correspond
  (function autoMarkCurrent(){
    const page = getCurrentPage();
    for(const [step, url] of Object.entries(STEP_URLS)){
      if(page === url){
        if(getSavedStep() !== step){
          localStorage.setItem(LS_KEY, step);
        }
        break;
      }
    }
  })();

  // Initialiser l'Ã©tape courante Ã  'identification' si non dÃ©finie
  if(!getSavedStep()){
    localStorage.setItem(LS_KEY, 'identification');
  }
})();

/* === Core JS unifiÃ© (fusion scripts Ã©pars) === */
(function(){
  const LS_STEP_KEY='currentStep';
  const STEP_URLS={conditions:'conditions.html',identification:'identification.html',paiement:'paiement.html'};

  function setStep(step){ if(STEP_URLS[step]) localStorage.setItem(LS_STEP_KEY, step); }
  function getStep(){ return localStorage.getItem(LS_STEP_KEY); }
  function goToStep(step){ if(STEP_URLS[step]){ setStep(step); window.location.href=STEP_URLS[step]; } }
  window.goToStep=goToStep;

  function enforceStepOnLoad(){
    const file=location.pathname.split('/').pop().toLowerCase();
    const saved=getStep();
    if(saved && STEP_URLS[saved] && file!==STEP_URLS[saved]){
      // Ne redirige pas si utilisateur est revenu volontairement sur index
      if(file==='index.html') return;
      window.location.replace(STEP_URLS[saved]);
    } else {
      // Marquer automatiquement l'Ã©tape si page correspond
      for(const [k,v] of Object.entries(STEP_URLS)){
        if(file===v){ setStep(k); break; }
      }
    }
  }

  function initNav(){
    const toggle=document.getElementById('navToggle');
    const nav=document.getElementById('navMain');
    if(!toggle || !nav) return;
    toggle.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
    window.addEventListener('resize',()=>{ if(window.innerWidth>768) nav.classList.remove('open'); });
  }

  // Payment modal unique (Moov)
  function initPaymentModal(){
    const modal=document.getElementById('paymentModal');
    const btn=document.getElementById('btnPayer');
    if(!modal || !btn) return;
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
    btn.addEventListener('click',open);
    modal.addEventListener('click',e=>{if(e.target===modal||e.target.hasAttribute('data-close-modal')) close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
  }

  function applyIdentificationCompact(){
    if(!document.body.classList.contains('identification-page')) return;
    const form=document.getElementById('identificationForm');
    if(!form) return;
    // Filet de sÃ©curitÃ© si scripts injectent des marges tardivement
    const enforce=()=>{
      form.querySelectorAll('.field-col,.form-group,.mb-3,.field-row').forEach(el=>{
        if(getComputedStyle(el).marginBottom!=='8px') el.style.marginBottom='8px';
      });
    };
    enforce();
    new MutationObserver(enforce).observe(form,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
  }

  // Init
  enforceStepOnLoad();
  initNav();
  initPaymentModal();
  applyIdentificationCompact();
})();
