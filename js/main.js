/**
 * 社会保険労務士法人ストラテジー - Main JavaScript
 */

(function () {
  'use strict';

  /* =========================================================
     Hamburger Menu / Mobile Navigation
  ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Esc key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* =========================================================
     Header Scroll Effect
  ========================================================= */
  const siteHeader = document.getElementById('site-header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up (mobile only)
    if (window.innerWidth <= 768) {
      if (scrollY > lastScrollY && scrollY > 100) {
        siteHeader.style.transform = 'translateY(-100%)';
      } else {
        siteHeader.style.transform = 'translateY(0)';
      }
    } else {
      siteHeader.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* =========================================================
     Back to Top Button
  ========================================================= */
  const backToTop = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    window.addEventListener('scroll', handleBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================
     Intersection Observer - AOS-like animation
  ========================================================= */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* =========================================================
     Smooth Scroll for anchor links
  ========================================================= */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        closeMobileNav();
      });
    });
  }

  /* =========================================================
     Accordion (Q&A)
  ========================================================= */
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (!accordionItems.length) return;

    accordionItems.forEach(function (item) {
      const header = item.querySelector('.accordion-header');
      const body = item.querySelector('.accordion-body');
      if (!header || !body) return;

      header.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all
        accordionItems.forEach(function (other) {
          other.classList.remove('open');
          const otherBody = other.querySelector('.accordion-body');
          if (otherBody) otherBody.style.maxHeight = '0';
        });

        // Open clicked if was closed
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    });
  }

  /* =========================================================
     Active nav highlight
  ========================================================= */
  function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list .nav-item a, .mobile-nav-list li a');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href.includes(currentPath)) {
        link.closest('li').classList.add('active');
      } else {
        link.closest('li').classList.remove('active');
      }
    });
  }

  /* =========================================================
     Contact Form (contact.html)
     送信先: takeuchi@stratoz.jp / kudo@stratoz.jp / umemura@stratoz.jp
     メール通知: Formspree経由（エンドポイント設定後に有効）
     自動返信: Formspreeダッシュボードで "Auto-Response" を有効化
  ========================================================= */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const errorEl   = document.getElementById('form-error');
      const successEl = document.getElementById('form-success');

      // Clear messages
      if (errorEl)   errorEl.style.display   = 'none';
      if (successEl) successEl.style.display = 'none';

      // ---- バリデーション ----
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        if (field.type === 'checkbox') {
          if (!field.checked) { field.classList.add('error'); valid = false; }
          else                { field.classList.remove('error'); }
        } else {
          if (!field.value.trim()) { field.classList.add('error'); valid = false; }
          else                     { field.classList.remove('error'); }
        }
      });

      if (!valid) {
        if (errorEl) {
          errorEl.textContent = '必須項目をすべて入力・確認してください。';
          errorEl.style.display = 'block';
        }
        return;
      }

      // メール形式チェック
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(emailField.value)) {
          emailField.classList.add('error');
          if (errorEl) {
            errorEl.textContent = 'メールアドレスの形式が正しくありません。';
            errorEl.style.display = 'block';
          }
          return;
        }
      }

      if (submitBtn) {
        submitBtn.disabled    = true;
        submitBtn.innerHTML   = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
      }

      // ---- 送信日時 ----
      const now = new Date();
      const sentAt = now.toLocaleDateString('ja-JP', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      });

      // ---- フォームデータ収集 ----
      const company  = form.querySelector('[name="company"]')?.value  || '（未記入）';
      const name     = form.querySelector('[name="name"]')?.value     || '';
      const email    = form.querySelector('[name="email"]')?.value    || '';
      const tel      = form.querySelector('[name="tel"]')?.value      || '（未記入）';
      const category = form.querySelector('[name="category"]')?.value || '';
      const message  = form.querySelector('[name="message"]')?.value  || '';

      // ---- メール本文 ----
      const mailBody = [
        '【Stratoz】お問い合わせがありました',
        '─'.repeat(40),
        '■ 送信日時　: ' + sentAt,
        '■ 会社名　　: ' + company,
        '■ お名前　　: ' + name,
        '■ メール　　: ' + email,
        '■ 電話番号　: ' + tel,
        '■ 種別　　　: ' + category,
        '─'.repeat(40),
        '■ お問い合わせ内容',
        message,
        '─'.repeat(40),
      ].join('\n');

      // ---- 自動返信メール本文 ----
      const autoReplyBody = [
        name + ' 様',
        '',
        'この度は社会保険労務士法人Stratoz（ストラテジー）にお問い合わせいただき、',
        'ありがとうございます。',
        '',
        '以下の内容でお問い合わせを受け付けました。',
        '担当者より1営業日以内にご連絡いたします。',
        '',
        '─'.repeat(40),
        '■ 送信日時　: ' + sentAt,
        '■ 会社名　　: ' + company,
        '■ お名前　　: ' + name,
        '■ メール　　: ' + email,
        '■ 電話番号　: ' + tel,
        '■ 種別　　　: ' + category,
        '─'.repeat(40),
        '■ お問い合わせ内容',
        message,
        '─'.repeat(40),
        '',
        '─────────────────────────',
        '社会保険労務士法人 Stratoz（ストラテジー）',
        '〒107-0051 東京都港区元赤坂1-2-7 赤坂Kタワー4F',
        'TEL: 03-6890-3248　受付: 平日 9:00〜18:00',
        'MAIL: info-str3@strcareer.co.jp',
        '─────────────────────────',
      ].join('\n');

      // ---- Formspree 送信 ----
      // フォームの data-formspree 属性からエンドポイントを取得
      // エンドポイント: https://formspree.io/f/xwvndayk
      //
      // Formspree ダッシュボードで以下を設定してください：
      //    [必須] Settings > Email Notifications の "To:" に以下3名を追加：
      //      takeuchi@stratoz.jp
      //      kudo@stratoz.jp
      //      umemura@stratoz.jp
      //    [必須] Settings > Email Notifications の "Subject:" を：
      //      【Stratoz】お問い合わせがありました
      //    [必須・問い合わせ者への自動返信] Plugins または Settings の Auto-Response / Auto-Responder を有効化し、
      //      送信者メールのフィールド名に「email」（JSON で送っている英字フィールド）を指定する。
      //      件名例: お問い合わせありがとうございます｜Stratoz
      //      本文は _autoresponse の内容が使われる（プランにより要確認）
      const FORMSPREE_ENDPOINT = form.dataset.formspree || '';

      const payload = {
        // Formspree予約フィールド（_で始まるフィールドはFormspreeが特別処理）
        _subject:      '【Stratoz】お問い合わせがありました',
        _replyto:      email,
        // 問い合わせ側への自動返信本文（ダッシュボードで Auto-Response を有効化し、宛先フィールドに email を指定）
        _autoresponse: autoReplyBody,
        // 送信者向けメールの宛先・氏名（Formspree は英字の email / name を自動返信の宛先判定に使うことが多い）
        email:         email,
        name:          name,
        // 通知メール本文（Formspreeダッシュボードの "Message" に表示）
        message:       mailBody,
        // 個別フィールド（Formspreeダッシュボードの Submissions で確認可能）
        '送信日時':       sentAt,
        '会社名':         company,
        'お名前':         name,
        'メールアドレス': email,
        '電話番号':       tel,
        'お問合せ種別':   category,
        'お問合せ内容':   message,
      };

      try {
        // --- ① Formspreeへ送信（メール通知・自動返信） ---
        let mailSent = false;
        let formErrorDetail = '';
        if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.indexOf('YOUR_FORM_ID') === -1) {
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method:  'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
          });
          const errData = await res.json().catch(() => ({}));
          if (!res.ok) {
            console.warn('Formspree error:', errData);
            formErrorDetail = (errData && (errData.error || errData.message))
              ? String(errData.error || errData.message)
              : '';
          }
          mailSent = res.ok;
        } else {
          console.warn('Formspree endpoint not configured. Set data-formspree attribute on the form.');
        }

        // --- ② テーブルAPIへ保存（任意・静的サイトでは未実装のため失敗しても無視） ---
        try {
          await fetch('tables/inquiries', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sent_at:  sentAt,
              company, name, email, tel, category, message,
              mail_sent: mailSent,
            }),
          });
        } catch (backupErr) {
          console.warn('Inquiries backup skipped (no API):', backupErr);
        }

        if (!mailSent) {
          if (errorEl) {
            errorEl.textContent = formErrorDetail
              ? ('送信できませんでした：' + formErrorDetail + ' お手数ですが、お電話（03-6890-3248）にてご連絡ください。')
              : '送信に失敗しました。Formspree の設定をご確認ください。お手数ですが、お電話（03-6890-3248）にてご連絡ください。';
            errorEl.style.display = 'block';
          }
          if (submitBtn) {
            submitBtn.disabled  = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>送信する';
          }
          return;
        }

        // --- 成功（Formspree 送信済み） ---
        form.reset();
        if (successEl) {
          successEl.innerHTML = [
            '<strong><i class="fas fa-check-circle"></i> 送信が完了しました。</strong><br>',
            'お問い合わせいただきありがとうございます。<br>',
            '1営業日以内に担当者よりご連絡いたします。<br>',
            '<small style="color:#555;">（自動返信メールが届かない場合は迷惑メールフォルダをご確認ください）</small>',
          ].join('');
          successEl.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>送信する';
        }
        if (successEl) {
          window.scrollTo({ top: successEl.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
        }

      } catch (err) {
        console.error('Contact form:', err);
        if (errorEl) {
          errorEl.textContent = '送信中にエラーが発生しました。お手数ですが、お電話（03-6890-3248）にてご連絡ください。';
          errorEl.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.disabled  = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>送信する';
        }
      }
    });

    // Real-time error clear
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        this.classList.remove('error');
      });
    });
  }

  /* =========================================================
     Tab navigation (Business page)
  ========================================================= */
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = this.dataset.tab;

        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });

        this.classList.add('active');
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* =========================================================
     Column / Case filter
  ========================================================= */
  function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('[data-category]');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = this.dataset.filter;

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        filterItems.forEach(function (item) {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* =========================================================
     Number Counter Animation
  ========================================================= */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(function () {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = Math.floor(current).toLocaleString();
            }, 16);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* =========================================================
     Price page: mobile tabs (≤768px)
  ========================================================= */
  function initPriceTabs() {
    var bar = document.getElementById('price-tab-bar');
    if (!bar) return;

    var tabs = bar.querySelectorAll('[role="tab"]');
    var panelSelector = '.page-price .price-section';

    function isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    }

    function showPanel(id) {
      document.querySelectorAll(panelSelector).forEach(function (sec) {
        sec.hidden = isMobile() ? sec.id !== id : false;
      });
    }

    function applyTabFromHash() {
      if (!isMobile()) return;
      var h = (window.location.hash || '').replace(/^#/, '');
      if (h && bar.querySelector('[data-target="' + h + '"]')) {
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t.getAttribute('data-target') === h ? 'true' : 'false');
        });
        showPanel(h);
        return;
      }
      var first = tabs[0];
      if (first) {
        var fid = first.getAttribute('data-target');
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t.getAttribute('data-target') === fid ? 'true' : 'false');
        });
        showPanel(fid);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-target');
        if (!id) return;
        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        });
        if (isMobile()) {
          showPanel(id);
          try {
            history.replaceState(null, '', '#' + id);
          } catch (e) {}
          var el = document.getElementById(id);
          if (el) {
            var y = el.getBoundingClientRect().top + window.scrollY - 8;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      });
    });

    function applyLayout() {
      if (!isMobile()) {
        document.querySelectorAll(panelSelector).forEach(function (sec) {
          sec.removeAttribute('hidden');
        });
        return;
      }
      applyTabFromHash();
    }

    window.addEventListener('resize', applyLayout);
    window.addEventListener('hashchange', applyTabFromHash);
    applyLayout();
  }

  /* =========================================================
     Init All
  ========================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initSmoothScroll();
    initAccordion();
    setActiveNav();
    initContactForm();
    initTabs();
    initFilter();
    initCounters();
    initPriceTabs();
  });

  // Resize handler
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileNav();
      if (siteHeader) siteHeader.style.transform = 'translateY(0)';
    }
  });

})();
