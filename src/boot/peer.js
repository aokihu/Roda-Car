import Peer from 'simple-peer';

const STUN_SERVERS = [
  'stun.ekiga.net',
  'stun.ideasip.com',
  'stun.schlund.de',
  'stun.stunprotocol.org',
  'stun.voiparound.com',
  'stun.voipbuster.com',
  'stun.voipstunt.com',
  'stun.voxgratia.org',
  'stun.xten.com',
  'sip1.lakedestiny.cordiaip.com',
  'stun.callwithus.com',
  'stun.counterpath.net',
  'stun.internetcalls.com',
  'stun.sipgate.net',
  'stun.stunprotocol.org',
  'stun.voip.aebc.com',
  'numb.viagenie.ca',
  'stun.counterpath.com',
  'iphone-stun.strato-iphone.de',
  'numb.viagenie.ca',
  'sip1.lakedestiny.cordiaip.com',
  'stun.12connect.com',
  'stun.12voip.com',
  'stun.1cbit.ru',
  'stun.1und1.de',
  'stun.2talk.co.nz',
  'stun.2talk.com',
  'stun.3clogic.com',
  'stun.3cx.com',
  'stun.a-mm.tv',
  'stun.aa.net.uk',
  'stun.aceweb.com',
  'stun.acrobits.cz',
  'stun.acronis.com',
  'stun.actionvoip.com',
  'stun.advfn.com',
  'stun.aeta-audio.com',
  'stun.aeta.com',
  'stun.allflac.com',
  'stun.anlx.net',
  'stun.antisip.com',
  'stun.avigora.com',
  'stun.avigora.fr',
  'stun.b2b2c.ca',
  'stun.barracuda.com',
  'stun.beam.pro',
  'stun.bahnhof.net',
  'stun.bitburger.de',
  'stun.bluesip.net',
  'stun.bomgar.com',
  'stun.botonakis.com',
  'stun.budgetphone.nl',
  'stun.budgetsip.com',
  'stun.cablenet-as.net',
  'stun.callromania.ro',
  'stun.callwithus.com',
  'stun.cheapvoip.com',
  'stun.cloopen.com',
  'stun.cognitoys.com',
  'stun.commpeak.com',
  'stun.comrex.com',
  'stun.comtube.com',
  'stun.comtube.ru',
  'stun.connecteddata.com',
  'stun.cope.es',
  'stun.counterpath.com',
  'stun.counterpath.net',
  'stun.crimeastar.net',
  'stun.dcalling.de',
  'stun.demos.ru',
  'stun.demos.su',
  'stun.dls.net',
  'stun.dokom.net',
  'stun.dowlatow.ru',
  'stun.duocom.es',
  'stun.dus.net',
  'stun.e-fon.ch',
  'stun.easycall.pl',
  'stun.easyvoip.com',
  'stun.ekiga.net',
  'stun.ekir.de',
  'stun.elitetele.com',
  'stun.emu.ee',
  'stun.engineeredarts.co.uk',
  'stun.eoni.com',
  'stun.epygi.com',
  'stun.faktortel.com.au',
  'stun.fbsbx.com',
  'stun.fmo.de',
  'stun.freecall.com',
  'stun.freeswitch.org',
  'stun.freevoipdeal.com',
  'stun.genymotion.com',
  'stun.gmx.de',
  'stun.gmx.net',
  'stun.wtfismyip.com',
  'stun.gnunet.org',
  'stun.gradwell.com',
  'stun.halonet.pl',
  'stun.highfidelity.io',
  'stun.hoiio.com',
  'stun.hosteurope.de',
  'stun.ideasip.com',
  'stun.infra.net',
  'stun.innovaphone.com',
  'stun.instantteleseminar.com',
  'stun.internetcalls.com',
  'stun.intervoip.com',
  'stun.ipcomms.net',
  'stun.ipfire.org',
  'stun.ippi.fr',
  'stun.it1.hr',
  'stun.ivao.aero',
  'stun.jabbim.cz',
  'stun.jumblo.com',
  'stun.justvoip.com',
  'stun.kaospilot.dk',
  'stun.kaseya.com',
  'stun.kaznpu.kz',
  'stun.kiwilink.co.nz',
  'stun.kuaibo.com',
  'stun.levigo.de',
  'stun.lindab.com',
  'stun.linphone.org',
  'stun.linx.net',
  'stun.liveo.fr',
  'stun.lowratevoip.com',
  'stun.lundimatin.fr',
  'stun.maestroconference.com',
  'stun.mangotele.com',
  'stun.mgn.ru',
  'stun.mit.de',
  'stun.miwifi.com',
  'stun.mixer.com',
  'stun.modulus.gr',
  'stun.mrmondialisation.org',
  'stun.myfreecams.com',
  'stun.myvoiptraffic.com',
  'stun.mywatson.it',
  'stun.nas.net',
  'stun.nautile.nc',
  'stun.netappel.com',
  'stun.nextcloud.com',
  'stun.nfon.net',
  'stun.ngine.de',
  'stun.node4.co.uk',
  'stun.nonoh.net',
  'stun.nottingham.ac.uk',
  'stun.nova.is',
  'stun.onesuite.com',
  'stun.onthenet.com.au',
  'stun.ooma.com',
  'stun.ozekiphone.com',
  'stun.personal-voip.de',
  'stun.petcube.com',
  'stun.pexip.com',
  'stun.phone.com',
  'stun.pidgin.im',
  'stun.pjsip.org',
  'stun.planete.net',
  'stun.poivy.com',
  'stun.powervoip.com',
  'stun.ppdi.com',
  'stun.rackco.com',
  'stun.redworks.nl',
  'stun.ringostat.com',
  'stun.rmf.pl',
  'stun.rockenstein.de',
  'stun.rolmail.net',
  'stun.rudtp.ru',
  'stun.rynga.com',
  'stun.sainf.ru',
  'stun.schlund.de',
  'stun.sigmavoip.com',
  'stun.sip.us',
  'stun.sipdiscount.com',
  'stun.sipgate.net:10000',
  'stun.sipgate.net',
  'stun.siplogin.de',
  'stun.sipnet.net',
  'stun.sipnet.ru',
  'stun.siportal.it',
  'stun.sippeer.dk',
  'stun.siptraffic.com',
  'stun.sma.de',
  'stun.smartvoip.com',
  'stun.smsdiscount.com',
  'stun.snafu.de',
  'stun.solcon.nl',
  'stun.solnet.ch',
  'stun.sonetel.com',
  'stun.sonetel.net',
  'stun.sovtest.ru',
  'stun.speedy.com.ar',
  'stun.spoiltheprincess.com',
  'stun.srce.hr',
  'stun.ssl7.net',
  'stun.swissquote.com',
  'stun.t-online.de',
  'stun.talks.by',
  'stun.tel.lu',
  'stun.telbo.com',
  'stun.telefacil.com',
  'stun.threema.ch',
  'stun.tng.de',
  'stun.twt.it',
  'stun.ucw.cz',
  'stun.uls.co.za',
  'stun.usfamily.net',
  'stun.veoh.com',
  'stun.vipgroup.net',
  'stun.viva.gr',
  'stun.vivox.com',
  'stun.vo.lu',
  'stun.vodafone.ro',
  'stun.voicetrading.com',
  'stun.voip.aebc.com',
  'stun.voip.blackberry.com',
  'stun.voip.eutelia.it',
  'stun.voiparound.com',
  'stun.voipblast.com',
  'stun.voipbuster.com',
  'stun.voipbusterpro.com',
  'stun.voipcheap.co.uk',
  'stun.voipcheap.com',
  'stun.voipdiscount.com',
  'stun.voipfibre.com',
  'stun.voipgain.com',
  'stun.voipgate.com',
  'stun.voipinfocenter.com',
  'stun.voipplanet.nl',
  'stun.voippro.com',
  'stun.voipraider.com',
  'stun.voipstunt.com',
  'stun.voipwise.com',
  'stun.voipzoom.com',
  'stun.voxgratia.org',
  'stun.voxox.com',
  'stun.voztele.com',
  'stun.wcoil.com',
  'stun.webcalldirect.com',
  'stun.whc.net',
  'stun.whoi.edu',
  'stun.wifirst.net',
  'stun.wwdl.net',
  'stun.xn----8sbcoa5btidn9i.xn--p1ai',
  'stun.xten.com',
  'stun.xtratelecom.es',
  'stun.zadarma.com',
  'stun.zepter.ru',
  'stun.zoiper.com',
  'stun1.faktortel.com.au',
].map(s => `stun:${s}`);

export default ({ Vue, store }) => {
  const { $socket, $bus } = Vue.prototype;

  // 创建P2P连接
  Vue.prototype.$createPeer = () => {
    const { peerId, destId } = store.state.system.settings;
    const peer = new Peer({
      initiator: true,
      config: {
        iceServers: [{ urls: STUN_SERVERS }],
      },
    });

    // 保证Peer的唯一性
    if (Vue.prototype.$peer) {
      Vue.prototype.$peer.destroy();
    }

    // 解析收到的数据
    const functionMaps = {
      start_video() {
        // Try video stream
        navigator.getUserMedia({
          video: {
            width: { min: 320, ideal: 320, max: 640 },
            height: { min: 240, ideal: 240, max: 480 },
            frameRate: { ideal: 30, max: 60 },
          },
          audio: false,
        },
        (stream) => {
          peer.addStream(stream);
        },
        (err) => {
          store.commit('system/addFailLog', `Get media stream fail ${err}`);
        });
      },
      motion_update(payload) {
        $bus.emit('p2p_motion_update', payload);
      },
    };

    function parseData(rawData) {
      const { type, payload } = JSON.parse(rawData);

      if (functionMaps[type]) {
        functionMaps[type](payload);
      }
    }

    peer.on('signal', (data) => {
      console.log(data);
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/p2pConnected');
      peer.send('hello');
    });

    peer.on('error', () => {
      store.commit('system/addFailLog', 'P2P Error');
      store.commit('system/p2pDisconnected');
      Vue.prototype.$peer.destroy();
      Vue.prototype.$peer = Vue.prototype.$createPeer();
    });

    peer.on('data', (data) => {
      store.commit('system/addLog', `Recv: ${data.toString()}`);
      parseData(data);
    });

    store.commit('system/addSuccessLog', 'P2P begin');

    Vue.prototype.$peer = peer;

    return peer;
  };

  // P2P发送消息
  Vue.prototype.$peerSendData = (type, payload) => {
    const data = { type, payload };
    const { isConnected } = store.state.system.p2p;

    if (Vue.prototype.$peer && isConnected) {
      Vue.prototype.$peer.send(JSON.stringify(data));
      store.commit('system/addLog', `SEND '${type}' with '${JSON.stringify(payload)}'`);
    }
  };
};
